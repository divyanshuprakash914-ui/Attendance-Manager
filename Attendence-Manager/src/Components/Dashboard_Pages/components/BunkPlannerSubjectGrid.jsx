function pluralize(value, singular, plural = `${singular}s`) {
  return `${value} ${value === 1 ? singular : plural}`;
}

export default function BunkPlannerSubjectGrid({ subjects, threshold }) {
  return (
    <article className="dashboard-page-panel bunk-planner-subject-panel">
      <div className="dashboard-page-panel-head bunk-planner-panel-head">
        <div>
          <h2>Subject-wise bunk capacity</h2>
          <p>Every subject shows current health, max bunk left, and the effect of skipping the next class.</p>
        </div>
        <span className="bunk-planner-threshold-pill">{threshold}% floor</span>
      </div>

      <div className="bunk-planner-subject-grid">
        {subjects.map((subject) => (
          <article key={subject.id} className={`bunk-planner-subject-card tone-${subject.tone}`}>
            <div className="bunk-planner-subject-card-head">
              <div>
                <h3>{subject.name}</h3>
                <p>{subject.family}</p>
              </div>
              <span className={`bunk-planner-subject-state tone-${subject.tone}`}>{subject.toneLabel}</span>
            </div>

            <div className="bunk-planner-subject-score">
              <strong>{subject.percentageLabel}</strong>
              <span>
                {subject.attended}/{subject.total} attended
              </span>
            </div>

            <div className="bunk-planner-subject-metrics">
              <div className="bunk-planner-subject-box emphasis">
                <span>Max bunk left</span>
                <strong>{pluralize(subject.maxBunks, "class", "classes")}</strong>
              </div>
              <div className="bunk-planner-subject-box">
                <span>If next class is skipped</span>
                <strong>{subject.afterNextSkipLabel}</strong>
              </div>
              <div className="bunk-planner-subject-box">
                <span>Recovery needed</span>
                <strong>{subject.recoveryNeeded ? pluralize(subject.recoveryNeeded, "class", "classes") : "None"}</strong>
              </div>
              <div className="bunk-planner-subject-box">
                <span>Minimum required</span>
                <strong>{threshold}%</strong>
              </div>
            </div>

            <p className="bunk-planner-subject-note">{subject.note}</p>
          </article>
        ))}
      </div>
    </article>
  );
}
