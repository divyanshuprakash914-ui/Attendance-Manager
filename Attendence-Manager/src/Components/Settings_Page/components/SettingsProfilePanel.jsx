import { useEffect, useState } from "react";

function getInitials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function SettingsProfilePanel({ initialProfile }) {
  const [form, setForm] = useState(initialProfile);
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

  function updateField(event) {
    const { name, value } = event.target;

    setForm((current) => ({
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
          <span className="settings-soft-kicker">Profile information</span>
          <h3>Manage your public and workspace identity</h3>
        </div>

        <span className={`settings-save-pill ${saved ? "is-visible" : ""}`}>Saved locally</span>
      </div>

      <div className="settings-profile-identity">
        <div className="settings-profile-identity-main">
          <div className="settings-profile-avatar">{getInitials(form.name)}</div>

          <div className="settings-profile-identity-copy">
            <strong>{form.name}</strong>
            <span>{form.institution}</span>
          </div>
        </div>

        <button type="button" className="settings-secondary-button">
          Change avatar
        </button>
      </div>

      <div className="settings-form-grid">
        <label className="settings-field">
          <span>Full name</span>
          <input name="name" value={form.name} onChange={updateField} />
        </label>

        <label className="settings-field">
          <span>Institution</span>
          <input name="institution" value={form.institution} onChange={updateField} />
        </label>

        <label className="settings-field settings-field-wide">
          <span>Email</span>
          <input name="email" type="email" value={form.email} onChange={updateField} />
        </label>

        <label className="settings-field">
          <span>Phone</span>
          <input name="phone" value={form.phone} onChange={updateField} />
        </label>

        <label className="settings-field">
          <span>Department</span>
          <input name="department" value={form.department} onChange={updateField} />
        </label>

        <label className="settings-field">
          <span>Role</span>
          <input name="role" value={form.role} onChange={updateField} />
        </label>

        <label className="settings-field">
          <span>Location</span>
          <input name="location" value={form.location} onChange={updateField} />
        </label>

        <label className="settings-field">
          <span>Timezone</span>
          <input name="timezone" value={form.timezone} onChange={updateField} />
        </label>

        <label className="settings-field settings-field-wide">
          <span>Bio</span>
          <textarea name="bio" rows="5" value={form.bio} onChange={updateField} />
        </label>
      </div>

      <div className="settings-panel-footer">
        <p>These details appear across reports, approvals, and team coordination screens.</p>
        <button type="submit" className="settings-primary-button">
          Save changes
        </button>
      </div>
    </form>
  );
}
