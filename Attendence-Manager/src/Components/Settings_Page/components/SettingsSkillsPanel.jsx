import { useEffect, useState } from "react";

export default function SettingsSkillsPanel({ initialSkills }) {
  const [skills, setSkills] = useState(initialSkills);
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

  function toggleSkill(skillLabel) {
    setSkills((current) => {
      const selected = current.selected.includes(skillLabel)
        ? current.selected.filter((item) => item !== skillLabel)
        : [...current.selected, skillLabel];

      return {
        ...current,
        selected,
      };
    });
  }

  function updateField(event) {
    const { name, value } = event.target;

    setSkills((current) => ({
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
          <span className="settings-soft-kicker">Skills</span>
          <h3>Highlight what you work on most</h3>
        </div>

        <span className={`settings-save-pill ${saved ? "is-visible" : ""}`}>Updated locally</span>
      </div>

      <div className="settings-inline-grid">
        <label className="settings-field">
          <span>Primary role</span>
          <input name="primaryRole" value={skills.primaryRole} onChange={updateField} />
        </label>

        <label className="settings-field">
          <span>Experience level</span>
          <input name="experience" value={skills.experience} onChange={updateField} />
        </label>
      </div>

      <section className="settings-chip-section">
        <div className="settings-section-copy">
          <strong>Focus areas</strong>
          <p>Select the workflows that describe your current responsibility.</p>
        </div>

        <div className="settings-chip-grid">
          {skills.suggestions.map((skill) => {
            const isSelected = skills.selected.includes(skill);

            return (
              <button
                key={skill}
                type="button"
                className={`settings-skill-chip ${isSelected ? "is-selected" : ""}`}
                onClick={() => toggleSkill(skill)}
              >
                {skill}
              </button>
            );
          })}
        </div>
      </section>

      <div className="settings-panel-footer">
        <p>Your selected skills help personalize reports, handoffs, and approval queues.</p>
        <button type="submit" className="settings-primary-button">
          Save skills
        </button>
      </div>
    </form>
  );
}
