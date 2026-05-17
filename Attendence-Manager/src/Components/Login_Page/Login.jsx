import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

const overviewStats = [
  { label: "Institutes synced", value: "128" },
  { label: "Alerts cleared", value: "24" },
  { label: "Verified today", value: "96%" },
];

const trendBars = [
  { day: "M", height: "46%" },
  { day: "T", height: "58%" },
  { day: "W", height: "74%" },
  { day: "T", height: "64%" },
  { day: "F", height: "82%" },
  { day: "S", height: "69%" },
];

const reviewQueue = [
  { title: "Biometric sync", meta: "4 sections pending review" },
  { title: "Low attendance alert", meta: "Mentor follow-up requested" },
  { title: "Approval workflow", meta: "12 leave requests auto-routed" },
];

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
      <main className="login-shell">
        <section className="login-content-panel">
          <Link to="/" className="login-wordmark">
            AttendEase
          </Link>

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

              <form className="login-form" onSubmit={(event) => event.preventDefault()}>
                <label className="login-input-shell">
                  <span className="sr-only">Email or username</span>
                  <input type="text" placeholder="Enter email or username" />
                </label>

                <button type="submit" className="login-continue-button">
                  Continue
                </button>
              </form>

              <p className="login-legal-copy">
                By continuing, you agree to our
                <a href="/"> Terms </a>
                and
                <a href="/"> Privacy Policy.</a>
              </p>

              <p className="login-signup-copy">
                Don&apos;t have an account?
                <a href="/"> Sign up</a>
              </p>
            </div>
          </div>
        </section>

        <aside className="login-art-panel" aria-hidden="true">
          <div className="art-grid" />
          <div className="art-glow art-glow-top" />
          <div className="art-glow art-glow-bottom" />

          <span className="art-badge">Attendance intelligence</span>

          <div className="art-callout art-callout-top">Realtime operational view</div>

          <div className="art-dashboard">
            <div className="dashboard-toolbar">
              <span />
              <span />
              <span />
              <p>Today overview</p>
            </div>

            <div className="dashboard-hero">
              <div>
                <span>Campus operations</span>
                <strong>96.2% attendance confirmed</strong>
              </div>

              <em>+4.8%</em>
            </div>

            <div className="dashboard-stats">
              {overviewStats.map((stat) => (
                <article key={stat.label} className="dashboard-stat">
                  <span>{stat.label}</span>
                  <strong>{stat.value}</strong>
                </article>
              ))}
            </div>

            <section className="dashboard-chart">
              <div className="dashboard-section-heading">
                <p>Weekly stability</p>
                <span>Updated 2 min ago</span>
              </div>

              <div className="chart-bars">
                {trendBars.map((bar) => (
                  <div key={bar.day} className="chart-bar-group">
                    <span className="chart-bar-track">
                      <span className="chart-bar-fill" style={{ height: bar.height }} />
                    </span>
                    <small>{bar.day}</small>
                  </div>
                ))}
              </div>
            </section>

            <section className="dashboard-queue">
              <div className="dashboard-section-heading">
                <p>Priority queue</p>
                <span>3 active</span>
              </div>

              <div className="queue-list">
                {reviewQueue.map((item) => (
                  <article key={item.title} className="queue-item">
                    <span className="queue-dot" />
                    <div>
                      <strong>{item.title}</strong>
                      <p>{item.meta}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <div className="art-callout art-callout-bottom">
            One workspace for faculty, mentors, and admin teams
          </div>
        </aside>
      </main>
    </div>
  );
}
