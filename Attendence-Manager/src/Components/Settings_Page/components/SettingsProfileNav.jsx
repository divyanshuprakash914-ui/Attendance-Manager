import SettingsSectionIcon from "./SettingsSectionIcon";

export default function SettingsProfileNav({ sections, activeSection, onSelect }) {
  return (
    <aside className="settings-profile-nav">
      <span className="settings-profile-nav-label">Settings menu</span>

      <div className="settings-profile-nav-list">
        {sections.map((section) => (
          <button
            key={section.id}
            type="button"
            className={`settings-profile-nav-item ${activeSection === section.id ? "is-active" : ""}`}
            aria-current={activeSection === section.id ? "page" : undefined}
            onClick={() => onSelect(section.id)}
          >
            <span className="settings-profile-nav-icon" aria-hidden="true">
              <SettingsSectionIcon name={section.icon} />
            </span>

            <span className="settings-profile-nav-copy">
              <strong>{section.label}</strong>
              <small>{section.description}</small>
            </span>
          </button>
        ))}
      </div>
    </aside>
  );
}
