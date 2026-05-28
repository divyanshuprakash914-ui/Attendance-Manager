function metric(label, value) {
  return { label, value };
}

export default function BunkPlannerImpactPanel({ scenario }) {
  const metrics = [
    metric("Current", scenario.currentOverall),
    metric("After skip", scenario.afterOverall),
    metric("Selection", scenario.selectedCountLabel),
    metric("Recovery", scenario.recoveryLabel),
  ];

  return (
    <article className="dashboard-page-panel bunk-planner-impact-panel">
      <div className="dashboard-page-panel-head bunk-planner-panel-head">
        <div>
          <h2>Attendance analyser</h2>
          <p>Instant result for the choice you are about to make.</p>
        </div>

        <span className={`bunk-planner-impact-badge tone-${scenario.tone}`}>{scenario.label}</span>
      </div>

      <div className={`bunk-planner-impact-hero tone-${scenario.tone}`}>
        <div>
          <span>Projected overall attendance</span>
          <strong>{scenario.afterOverall}</strong>
          <p>{scenario.summary}</p>
        </div>
        <div className="bunk-planner-impact-hero-side">
          <small>Minimum required</small>
          <strong>{scenario.threshold}</strong>
        </div>
      </div>

      <p className="bunk-planner-impact-details">{scenario.details}</p>

      <div className="bunk-planner-impact-metrics">
        {metrics.map((item) => (
          <div key={item.label} className="bunk-planner-impact-metric">
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>

      {scenario.daySummary ? <div className="bunk-planner-impact-strip">{scenario.daySummary}</div> : null}

      {scenario.affectedSubjects.length ? (
        <div className="bunk-planner-impact-subjects">
          <h3>Affected subjects</h3>

          <div className="bunk-planner-impact-subject-list">
            {scenario.affectedSubjects.map((subject) => (
              <div key={subject.id} className={`bunk-planner-impact-subject tone-${subject.tone}`}>
                <div>
                  <strong>{subject.name}</strong>
                  <span>
                    {subject.currentPercentageLabel} → {subject.afterPercentageLabel}
                  </span>
                </div>

                <div className="bunk-planner-impact-subject-meta">
                  <span>{subject.toneLabel}</span>
                  <small>
                    {subject.recoveryNeeded
                      ? `Attend next ${subject.recoveryNeeded} classes`
                      : `Still can bunk ${subject.remainingBunks}`}
                  </small>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div className={`bunk-planner-impact-recovery tone-${scenario.tone}`}>
        <strong>Recovery planner</strong>
        <p>{scenario.recoveryMessage}</p>
      </div>
    </article>
  );
}
