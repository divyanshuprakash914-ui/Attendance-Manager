import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Auth_Shared/AuthLayout.css";
import "./Login.css";
import EmailLogin from "./EmailLogin";

const handleGoogleLogin = () => {
  window.location.href = "http://localhost:8000/auth/google/login";
};

export default function Login() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/auth/me", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          return null;
        }

        return res.json();
      })
      .then((data) => {
        if (data) {
          setUser(data);
        }
      })
      .catch((err) => {
        console.log("User not logged in", err);
      });
  }, []);

  return (
    <div className="login-page">
      <main className="login-shell login-shell-solo">
        <section className="login-content-panel">

          <Link to="/" className="login-back-link">
            Back
          </Link>

          <div className="login-form-stage">
            <div className="login-form-shell">
              <div className="login-ball-mark" aria-hidden="true">
                <span />
              </div>

              <h1>Welcome back</h1>

              <button type="button" className="google-option" onClick={handleGoogleLogin}>
                <span
                  className={`google-badge ${user?.name ? "google-badge-user" : ""}`}
                  aria-hidden="true"
                >
                  <span>{user?.name ? user.name.charAt(0).toUpperCase() : "G"}</span>
                </span>
                <span className="google-option-copy">
                  <strong>
                    {user?.name ? `Continue with ${user.name}` : "Continue with Google"}
                  </strong>
                  <span>
                    {user?.name
                      ? "Use the account already available in your browser"
                      : "Use your workspace or personal account"}
                  </span>
                </span>
              </button>

              <div className="login-divider">
                <span>or</span>
              </div>

              <EmailLogin />

              <p className="login-legal-copy">
                By continuing, you agree to our
                <a href="/"> Terms </a>
                and
                <a href="/"> Privacy Policy.</a>
              </p>

              <p className="login-signup-copy">
                Don&apos;t have an account?
                <Link to="/create-account"> Sign up</Link>
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
