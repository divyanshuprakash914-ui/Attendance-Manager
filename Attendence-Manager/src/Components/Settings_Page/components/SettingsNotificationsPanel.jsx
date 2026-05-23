import { useEffect, useState } from "react";

export default function SettingsNotificationsPanel({ initialNotifications }) {
  const [items, setItems] = useState(initialNotifications);
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

  function toggleNotification(key) {
    setItems((current) =>
      current.map((item) =>
        item.key === key
          ? {
              ...item,
              enabled: !item.enabled,
            }
          : item,
      ),
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSaved(true);
  }

  return (
    <form className="settings-panel-card settings-panel-card-main" onSubmit={handleSubmit}>
      <div className="settings-panel-head">
        <div>
          <span className="settings-soft-kicker">Notifications</span>
          <h3>Choose what reaches you</h3>
        </div>

        <span className={`settings-save-pill ${saved ? "is-visible" : ""}`}>Preferences saved</span>
      </div>

      <div className="settings-toggle-list">
        {items.map((item) => (
          <label key={item.key} className="settings-toggle-card">
            <div className="settings-toggle-copy">
              <strong>{item.title}</strong>
              <p>{item.description}</p>
            </div>

            <input
              className="settings-toggle-input"
              type="checkbox"
              checked={item.enabled}
              onChange={() => toggleNotification(item.key)}
            />

            <span className={`settings-toggle-ui ${item.enabled ? "is-on" : ""}`} aria-hidden="true">
              <span className="settings-toggle-knob" />
            </span>
          </label>
        ))}
      </div>

      <div className="settings-panel-footer">
        <p>Notification changes affect email digests, risk alerts, and approval reminders.</p>
        <button type="submit" className="settings-primary-button">
          Save preferences
        </button>
      </div>
    </form>
  );
}
