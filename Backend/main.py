import os
from dotenv import load_dotenv
from routers import dashboard

load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware

from auth.google_auth import router as google_auth_router
from auth.email_auth import router as email_auth_router

frontend_origin = (os.getenv("FRONTEND_URL") or "http://localhost:5173").rstrip("/")
alternate_frontend_origin = (
    frontend_origin.replace("localhost", "127.0.0.1")
    if "localhost" in frontend_origin
    else frontend_origin.replace("127.0.0.1", "localhost")
)
allowed_origins = list(dict.fromkeys([frontend_origin, alternate_frontend_origin]))

ENV = os.getenv("ENV", "dev")
app = FastAPI(
    docs_url = "/docs" if ENV == "dev" else None,
    redoc_url = "/redoc" if ENV == "dev" else None,
    openapi_url = "/openapi.json" if ENV == "dev" else None,
)

app.add_middleware(
    SessionMiddleware,
    secret_key=os.getenv("SESSION_SECRET_KEY")
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(google_auth_router)
app.include_router(email_auth_router)
app.include_router(dashboard.router)


@app.get("/")
def home():
    return {
        "message": "FastAPI Backend is running."
    }

