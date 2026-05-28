import { Link } from "react-router-dom";

export default function BunkPlannerRecoveryPanel({ bestDay, protectedClasses, recoveryQueue }) {
  return (
    <article className="dashboard-page-panel bunk-planner-recovery-panel">
      <div className="dashboard-page-panel-head bunk-planner-panel-head">
        <div>
          <h2>Recovery and leave guidance</h2>
          <p>Use the best day window only after the protected subjects and classes are covered.</p>
        </div>
      </div>

      <div className="bunk-planner-best-day">
        <div>
          <span>Best full-day option</span>
          <strong>{bestDay?.day || "No clean day yet"}</strong>
        </div>
        <div className={`bunk-planner-best-day-metric tone-${bestDay?.tone || "neutral"}`}>
          <span>After full-day skip</span>
          <strong>{bestDay?.afterOverallLabel || "—"}</strong>
        </div>
      </div>

      <div className="bunk-planner-recovery-section">
        <h3>Protect next</h3>
        <div className="bunk-planner-recovery-list">
          {protectedClasses.length ? (
            protectedClasses.map((item) => (
              <div key={item.id} className={`bunk-planner-recovery-item tone-${item.tone}`}>
                <strong>{item.label}</strong>
                <p>{item.description}</p>
              </div>
            ))
          ) : (
            <div className="bunk-planner-empty-block">No must-attend classes are marked in the live timetable right now.</div>
          )}
        </div>
      </div>

      <div className="bunk-planner-recovery-section">
        <h3>Recovery queue</h3>
        <div className="bunk-planner-recovery-list">
          {recoveryQueue.length ? (
            recoveryQueue.map((item) => (
              <div key={item.id} className={`bunk-planner-recovery-item tone-${item.tone}`}>
                <div className="bunk-planner-recovery-item-head">
                  <strong>{item.name}</strong>
                  <span>{item.percentageLabel}</span>
                </div>
                <p>{item.note}</p>
                <small>{item.recoveryLabel}</small>
              </div>
            ))
          ) : (
            <div className="bunk-planner-empty-block">No recovery queue right now. All tracked subjects are healthy.</div>
          )}
        </div>
      </div>

      <div className="bunk-planner-recovery-actions">
        <Link to="/dashboard/timetable" className="dashboard-page-link">
          Open timetable
          <span aria-hidden="true">→</span>
        </Link>
        <Link to="/dashboard/attendance" className="dashboard-page-link">
          Open attendance
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
