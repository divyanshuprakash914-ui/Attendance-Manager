import { useEffect, useState } from "react";

const API_ACCESS_PASSWORD_KEY = "attendease_api_access_password_hash";

async function hashPassword(password) {
  if (!window.crypto?.subtle) {
    return password;
  }

  const encoded = new TextEncoder().encode(password);
  const digest = await window.crypto.subtle.digest("SHA-256", encoded);

  return Array.from(new Uint8Array(digest))
    .map((value) => value.toString(16).padStart(2, "0"))
    .join("");
}

function getStoredPasswordHash() {
  try {
    return window.localStorage.getItem(API_ACCESS_PASSWORD_KEY) || "";
  } catch {
    return "";
  }
}

function saveStoredPasswordHash(hash) {
  try {
    window.localStorage.setItem(API_ACCESS_PASSWORD_KEY, hash);
  } catch {
    return;
  }
}

export default function SettingsApiPanel({ initialApiAccess }) {
  const [form, setForm] = useState(initialApiAccess);
  const [saved, setSaved] = useState(false);
  const [saveMessage, setSaveMessage] = useState("Saved locally");
  const [passwordConfigured, setPasswordConfigured] = useState(() => Boolean(getStoredPasswordHash()));
  const [unlocked, setUnlocked] = useState(false);
  const [accessError, setAccessError] = useState("");

  const [showBearer, setShowBearer] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [showSetupPassword, setShowSetupPassword] = useState(false);
  const [showSetupConfirmPassword, setShowSetupConfirmPassword] = useState(false);
  const [showUnlockPassword, setShowUnlockPassword] = useState(false);
  const [showNextPassword, setShowNextPassword] = useState(false);
  const [showNextConfirmPassword, setShowNextConfirmPassword] = useState(false);

  const [setupPassword, setSetupPassword] = useState("");
  const [setupConfirmPassword, setSetupConfirmPassword] = useState("");
  const [unlockPassword, setUnlockPassword] = useState("");
  const [nextPassword, setNextPassword] = useState("");
  const [nextConfirmPassword, setNextConfirmPassword] = useState("");

  useEffect(() => {
    if (!saved) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setSaved(false);
    }, 2200);

    return () => window.clearTimeout(timer);
  }, [saved]);

  function updateField(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function markSaved(message) {
    setSaveMessage(message);
    setSaved(true);
  }

  async function handleSetupPassword(event) {
    event.preventDefault();

    if (!setupPassword || !setupConfirmPassword) {
      setAccessError("Set and confirm an access password before opening API credentials.");
      return;
    }

    if (setupPassword.length < 8) {
      setAccessError("Access password must be at least 8 characters.");
      return;
    }

    if (setupPassword !== setupConfirmPassword) {
      setAccessError("Access password and confirmation must match.");
      return;
    }

    const passwordHash = await hashPassword(setupPassword);
    saveStoredPasswordHash(passwordHash);

    setPasswordConfigured(true);
    setUnlocked(true);
    setAccessError("");
    setSetupPassword("");
    setSetupConfirmPassword("");
    markSaved("Password set");
  }

  async function handleUnlock(event) {
    event.preventDefault();

    if (!unlockPassword) {
      setAccessError("Enter the access password to unlock API credentials.");
      return;
    }

    const submittedHash = await hashPassword(unlockPassword);
    const storedHash = getStoredPasswordHash();

    if (!storedHash || submittedHash !== storedHash) {
      setAccessError("Incorrect access password.");
      return;
    }

    setUnlocked(true);
    setUnlockPassword("");
    setAccessError("");
  }

  async function handleSaveUnlocked(event) {
    event.preventDefault();

    if (nextPassword || nextConfirmPassword) {
      if (!nextPassword || !nextConfirmPassword) {
        setAccessError("Complete both password fields to rotate the access password.");
        return;
      }

      if (nextPassword.length < 8) {
        setAccessError("New access password must be at least 8 characters.");
        return;
      }

      if (nextPassword !== nextConfirmPassword) {
        setAccessError("New access password and confirmation must match.");
        return;
      }

      const nextPasswordHash = await hashPassword(nextPassword);
      saveStoredPasswordHash(nextPasswordHash);
      setNextPassword("");
      setNextConfirmPassword("");
      setAccessError("");
      markSaved("Password updated");
      return;
    }

    setAccessError("");
    markSaved("Credentials saved");
  }

  function handleLockSection() {
    setUnlocked(false);
    setShowBearer(false);
    setShowSecret(false);
    setUnlockPassword("");
    setAccessError("");
  }

  if (!passwordConfigured) {
    return (
      <form className="settings-panel-card settings-panel-card-main" onSubmit={handleSetupPassword}>
        <div className="settings-panel-head">
          <div>
            <span className="settings-soft-kicker">API access</span>
            <h3>Create an access password first</h3>
          </div>

          <span className={`settings-save-pill ${saved ? "is-visible" : ""}`}>{saveMessage}</span>
        </div>

        <section className="settings-chip-section settings-api-summary">
          <div className="settings-section-copy">
            <strong>This section stays locked until a password is created</strong>
            <p>Set an access password once, then every later visit to API access will require that password.</p>
          </div>

          <div className="settings-api-status-list">
            <span className="settings-api-status-pill">Mandatory first-time setup</span>
            <span className="settings-api-status-pill">Protected reveal</span>
          </div>
        </section>

        <div className="settings-inline-grid">
          <label className="settings-field">
            <span>Access password</span>

            <div className="settings-secret-field">
              <input
                type={showSetupPassword ? "text" : "password"}
                value={setupPassword}
                onChange={(event) => setSetupPassword(event.target.value)}
                className="settings-secret-input"
                placeholder="At least 8 characters"
              />

              <button
                type="button"
                className="settings-secret-toggle"
                onClick={() => setShowSetupPassword((current) => !current)}
              >
                {showSetupPassword ? "Hide" : "Show"}
              </button>
            </div>
          </label>

          <label className="settings-field">
            <span>Confirm password</span>

            <div className="settings-secret-field">
              <input
                type={showSetupConfirmPassword ? "text" : "password"}
                value={setupConfirmPassword}
                onChange={(event) => setSetupConfirmPassword(event.target.value)}
                className="settings-secret-input"
                placeholder="Repeat the password"
              />

              <button
                type="button"
                className="settings-secret-toggle"
                onClick={() => setShowSetupConfirmPassword((current) => !current)}
              >
                {showSetupConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
          </label>
        </div>

        <p className={`settings-form-note ${accessError ? "is-error" : ""}`}>
          {accessError || "You must set this password before bearer token and client secret can be viewed."}
        </p>

        <div className="settings-panel-footer">
          <p>The password is used as a gate for this browser session so API credentials are not shown openly by default.</p>
          <button type="submit" className="settings-primary-button">
            Set password and continue
          </button>
        </div>
      </form>
    );
  }

  if (!unlocked) {
    return (
      <form className="settings-panel-card settings-panel-card-main" onSubmit={handleUnlock}>
        <div className="settings-panel-head">
          <div>
            <span className="settings-soft-kicker">API access</span>
            <h3>Unlock API credentials</h3>
          </div>
        </div>

        <section className="settings-chip-section settings-api-summary">
          <div className="settings-section-copy">
            <strong>This section is protected</strong>
            <p>Enter the access password to reveal the bearer token and client secret for this session.</p>
          </div>

          <div className="settings-api-status-list">
            <span className="settings-api-status-pill">Password required</span>
            <span className="settings-api-status-pill">Tokens hidden</span>
          </div>
        </section>

        <label className="settings-field settings-field-wide">
          <span>Access password</span>

          <div className="settings-secret-field">
            <input
              type={showUnlockPassword ? "text" : "password"}
              value={unlockPassword}
              onChange={(event) => setUnlockPassword(event.target.value)}
              className="settings-secret-input"
              placeholder="Enter your access password"
            />

            <button
              type="button"
              className="settings-secret-toggle"
              onClick={() => setShowUnlockPassword((current) => !current)}
            >
              {showUnlockPassword ? "Hide" : "Show"}
            </button>
          </div>
        </label>

        <p className={`settings-form-note ${accessError ? "is-error" : ""}`}>
          {accessError || "Credentials stay hidden until the correct password is entered."}
        </p>

        <div className="settings-panel-footer">
          <p>Unlocking is only for the current visit. Leaving the API section will require the password again.</p>
          <button type="submit" className="settings-primary-button">
            Unlock API section
          </button>
        </div>
      </form>
    );
  }

  return (
    <form className="settings-panel-card settings-panel-card-main" onSubmit={handleSaveUnlocked}>
      <div className="settings-panel-head">
        <div>
          <span className="settings-soft-kicker">API access</span>
          <h3>Bearer token and client secret</h3>
        </div>

        <span className={`settings-save-pill ${saved ? "is-visible" : ""}`}>{saveMessage}</span>
      </div>

      <section className="settings-chip-section settings-api-summary">
        <div className="settings-section-copy">
          <strong>Protected access enabled</strong>
          <p>This section is unlocked for the current visit. Lock it again when you finish reviewing these credentials.</p>
        </div>

        <div className="settings-api-status-list">
          <span className="settings-api-status-pill">Bearer auth</span>
          <span className="settings-api-status-pill">Secret-based client</span>
          <span className="settings-api-status-pill">Unlocked now</span>
        </div>
      </section>

      <div className="settings-form-grid">
        <label className="settings-field settings-field-wide">
          <span>Bearer token</span>

          <div className="settings-secret-field">
            <input
              name="bearerToken"
              type={showBearer ? "text" : "password"}
              value={form.bearerToken}
              onChange={updateField}
              className="settings-secret-input"
              spellCheck="false"
            />

            <button
              type="button"
              className="settings-secret-toggle"
              onClick={() => setShowBearer((current) => !current)}
            >
              {showBearer ? "Hide" : "Show"}
            </button>
          </div>
        </label>

        <label className="settings-field settings-field-wide">
          <span>Client secret</span>

          <div className="settings-secret-field">
            <input
              name="clientSecret"
              type={showSecret ? "text" : "password"}
              value={form.clientSecret}
              onChange={updateField}
              className="settings-secret-input"
              spellCheck="false"
            />

            <button
              type="button"
              className="settings-secret-toggle"
              onClick={() => setShowSecret((current) => !current)}
            >
              {showSecret ? "Hide" : "Show"}
            </button>
          </div>
        </label>
      </div>

      <section className="settings-chip-section settings-api-protection">
        <div className="settings-section-copy">
          <strong>Rotate access password</strong>
          <p>Optionally replace the current password used to unlock this API section in future visits.</p>
        </div>

        <div className="settings-inline-grid">
          <label className="settings-field">
            <span>New access password</span>

            <div className="settings-secret-field">
              <input
                type={showNextPassword ? "text" : "password"}
                value={nextPassword}
                onChange={(event) => setNextPassword(event.target.value)}
                className="settings-secret-input"
                placeholder="Leave empty to keep current password"
              />

              <button
                type="button"
                className="settings-secret-toggle"
                onClick={() => setShowNextPassword((current) => !current)}
              >
                {showNextPassword ? "Hide" : "Show"}
              </button>
            </div>
          </label>

          <label className="settings-field">
            <span>Confirm new password</span>

            <div className="settings-secret-field">
              <input
                type={showNextConfirmPassword ? "text" : "password"}
                value={nextConfirmPassword}
                onChange={(event) => setNextConfirmPassword(event.target.value)}
                className="settings-secret-input"
                placeholder="Repeat new password"
              />

              <button
                type="button"
                className="settings-secret-toggle"
                onClick={() => setShowNextConfirmPassword((current) => !current)}
              >
                {showNextConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
          </label>
        </div>

        <p className={`settings-form-note ${accessError ? "is-error" : ""}`}>
          {accessError || "Leave both fields empty if you only want to save tokens without changing the access password."}
        </p>
      </section>

      <div className="settings-panel-footer">
        <p>These credentials can be used for backend integrations, protected API requests, and external clients.</p>

        <div className="settings-panel-footer-actions">
          <button type="button" className="settings-secondary-button" onClick={handleLockSection}>
            Lock section
          </button>

          <button type="submit" className="settings-primary-button">
            Save credentials
          </button>
        </div>
      </div>
    </form>
  );
}
