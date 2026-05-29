import { Link } from "react-router-dom";

export default function LeaveTrackerCalendarPanel({ title, subtitle, entries }) {
  return (
    <article className="dashboard-page-panel leave-tracker-calendar-panel">
      <div className="dashboard-page-panel-head">
        <div>
          <h2>{title}</h2>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
      </div>

      {entries.length ? (
        <div className="leave-tracker-calendar-grid">
          {entries.map((entry) => (
            <div key={entry.id} className={`leave-tracker-calendar-card tone-${entry.tone}`}>
              <div className="leave-tracker-calendar-card-head">
                <div>
                  <span>{entry.day}</span>
                  <strong>{entry.modeLabel}</strong>
                </div>
                <div className="leave-tracker-calendar-metric">
                  <span>After leave</span>
                  <strong>{entry.afterOverall}</strong>
                </div>
              </div>

              <p>{entry.detail}</p>

              <div className="leave-tracker-calendar-footer">
                <span className={`leave-tracker-calendar-badge tone-${entry.tone}`}>{entry.countLabel}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="leave-tracker-calendar-empty">
          No confirmed bunks yet. Confirm a class or day in Bunk Planner to build this leave calendar.
        </div>
      )}

      <Link to="/dashboard/bunk-planner" className="dashboard-page-link">
        Open bunk planner
        <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}
