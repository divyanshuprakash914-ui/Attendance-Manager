import { useEffect, useState } from "react";

export default function SettingsAccountPanel({ initialAccount }) {
  const [account, setAccount] = useState(initialAccount);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!saved) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setSaved(false);
    }, 2200);

    return () => window.clearTimeout(timer);
  }, [saved]);

  function toggleFlag(key) {
    setAccount((current) => ({
      ...current,
      [key]: !current[key],
    }));
  }

  function updateField(event) {
    const { name, value } = event.target;

    setAccount((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSaved(true);
  }

  return (
    <form className="settings-panel-card settings-panel-card-main" onSubmit={handleSubmit}>
      <div className="settings-panel-head">
        <div>
          <span className="settings-soft-kicker">Account</span>
          <h3>Security and session controls</h3>
        </div>

        <span className={`settings-save-pill ${saved ? "is-visible" : ""}`}>Security saved</span>
      </div>

      <div className="settings-inline-grid">
        <label className="settings-field settings-field-wide">
          <span>Recovery email</span>
          <input
            name="recoveryEmail"
            type="email"
            value={account.recoveryEmail}
            onChange={updateField}
          />
        </label>
      </div>

      <div className="settings-toggle-list">
        <label className="settings-toggle-card">
          <div className="settings-toggle-copy">
            <strong>Two-factor authentication</strong>
            <p>Add a second verification step when signing in to your workspace.</p>
          </div>

          <input
            className="settings-toggle-input"
            type="checkbox"
            checked={account.twoFactorEnabled}
            onChange={() => toggleFlag("twoFactorEnabled")}
          />

          <span
            className={`settings-toggle-ui ${account.twoFactorEnabled ? "is-on" : ""}`}
            aria-hidden="true"
          >
            <span className="settings-toggle-knob" />
          </span>
        </label>

        <label className="settings-toggle-card">
          <div className="settings-toggle-copy">
            <strong>Login alerts</strong>
            <p>Send an email whenever a new device signs in to your account.</p>
          </div>

          <input
            className="settings-toggle-input"
            type="checkbox"
            checked={account.loginAlerts}
            onChange={() => toggleFlag("loginAlerts")}
          />

          <span className={`settings-toggle-ui ${account.loginAlerts ? "is-on" : ""}`} aria-hidden="true">
            <span className="settings-toggle-knob" />
          </span>
        </label>
      </div>

      <section className="settings-session-section">
        <div className="settings-section-copy">
          <strong>Active sessions</strong>
          <p>Review the devices currently signed in to your AttendEase account.</p>
        </div>

        <div className="settings-session-list">
          {account.sessions.map((session) => (
            <div key={`${session.device}-${session.location}`} className="settings-session-card">
              <div>
                <strong>{session.device}</strong>
                <p>{session.location}</p>
              </div>

              <span className={`settings-session-pill ${session.current ? "is-current" : ""}`}>
                {session.current ? "Current" : "Active"}
              </span>
            </div>
          ))}
        </div>
      </section>

      <div className="settings-panel-footer">
        <p>Security settings help protect attendance approvals, exports, and admin access.</p>
        <button type="submit" className="settings-primary-button">
          Save account
        </button>
      </div>
    </form>
  );
}
