import { Link } from "react-router-dom";

import "../Auth_Shared/AuthLayout.css";
import "./CreateAccount.css";

const handleGoogleSignup = () => {
  window.location.href = "http://localhost:8000/auth/google/login";
};

export default function CreateAccount() {
  return (
    <div className="login-page create-account-page">
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

              <h1>Create your account</h1>
              <p className="create-account-intro">
                Start with Google or use your work email.
              </p>

              <div className="create-account-auth-grid">
                <section className="create-account-social-panel">
                  <span className="create-account-panel-kicker">Quick start</span>
                  <h2>Continue with Google</h2>

                  <button type="button" className="google-option" onClick={handleGoogleSignup}>
                    <span className="google-badge" aria-hidden="true">
                      <span>G</span>
                    </span>
                    <span className="google-option-copy">
                      <strong>Continue with Google</strong>
                      <span>Create your account using your workspace or personal email</span>
                    </span>
                  </button>
                </section>

                <div className="create-account-divider">
                  <span>or</span>
                </div>

                <section className="create-account-email-panel">
                  <span className="create-account-panel-kicker">Use work email</span>

                  <form className="login-form create-account-form" onSubmit={(event) => event.preventDefault()}>
                    <div className="create-account-form-row">
                      <label className="login-input-shell">
                        <span className="sr-only">Full name</span>
                        <input type="text" placeholder="Full name" />
                      </label>

                      <label className="login-input-shell">
                        <span className="sr-only">Institution</span>
                        <input type="text" placeholder="Institution" />
                      </label>
                    </div>

                    <label className="login-input-shell">
                      <span className="sr-only">Work email</span>
                      <input type="email" placeholder="Work email" />
                    </label>

                    <button type="submit" className="login-continue-button">
                      Create account
                    </button>
                  </form>
                </section>
              </div>

              <div className="create-account-meta">
                <p className="login-legal-copy">
                  By continuing, you agree to our
                  <a href="/"> Terms </a>
                  and
                  <a href="/"> Privacy Policy.</a>
                </p>

                <p className="login-signup-copy">
                  Already have an account?
                  <Link to="/login"> Log in</Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
