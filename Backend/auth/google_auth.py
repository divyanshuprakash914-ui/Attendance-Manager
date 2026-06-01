import os
import secrets
from dotenv import load_dotenv

from fastapi import APIRouter, Request, HTTPException, Depends, status
from auth.dependencies import require_user_or_api_token
from authlib.integrations.starlette_client import OAuth
from fastapi.responses import RedirectResponse

load_dotenv()

router = APIRouter(
    prefix="/auth",
    tags=["Google Auth"]
)

oauth = OAuth()

oauth.register(
    name="google",
    client_id=os.getenv("GOOGLE_CLIENT_ID"),
    client_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
    server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
    client_kwargs={
        "scope": "openid email profile"
    },
)


def normalize_base_url(value: str | None, fallback: str) -> str:
    return (value or fallback).rstrip("/")


def get_env_list(key: str):
    value = os.getenv(key, "")
    return [item.strip().lower() for item in value.split(",") if item.strip()]


def is_email_allowed(email: str) -> bool:
    email = email.lower()

    allowed_emails = get_env_list("ALLOWED_AUTH_EMAILS")
    allowed_domains = get_env_list("ALLOWED_AUTH_DOMAINS")

    if allowed_emails and email not in allowed_emails:
        return False

    if allowed_domains:
        domain = email.split("@")[-1]
        if domain not in allowed_domains:
            return False

    return True


def require_user(request: Request):
    user = request.session.get("user")

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated"
        )

    return user


@router.get("/google/login")
async def google_login(request: Request):
    backend_url = normalize_base_url(os.getenv("BACKEND_URL"), "http://localhost:8000")
    redirect_url = f"{backend_url}/auth/google/callback"

    state = secrets.token_urlsafe(32)
    request.session["oauth_state"] = state

    return await oauth.google.authorize_redirect(
        request,
        redirect_url,
        state=state
    )


@router.get("/google/callback")
async def google_callback(request: Request):
    returned_state = request.query_params.get("state")
    saved_state = request.session.get("oauth_state")

    if not saved_state or not returned_state or not secrets.compare_digest(saved_state, returned_state):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid OAuth state"
        )

    request.session.pop("oauth_state", None)

    token = await oauth.google.authorize_access_token(request)
    user_info = token.get("userinfo")

    if not user_info:
        user_info = await oauth.google.userinfo(token=token)

    email = user_info.get("email")
    name = user_info.get("name")
    picture = user_info.get("picture")
    email_verified = user_info.get("email_verified")

    if not email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Google account email not found"
        )

    if email_verified is False:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Google email is not verified"
        )

    if not is_email_allowed(email):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Email not allowed"
        )

    request.session["user"] = {
        "email": email,
        "name": name,
        "picture": picture,
    }

    frontend_url = normalize_base_url(os.getenv("FRONTEND_URL"), "http://localhost:5173")

    return RedirectResponse(url=f"{frontend_url}/dashboard")


@router.get("/me")
def auth_me(user=Depends(require_user_or_api_token)):
    return {
        "authenticated": True,
        "user": user
    }


@router.get("/logout")
def logout(request: Request, user=Depends(require_user_or_api_token)):
    request.session.clear()
    return {
        "message": "Logged Out Successfully"
    }
