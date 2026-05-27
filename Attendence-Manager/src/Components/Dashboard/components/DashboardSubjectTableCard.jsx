import { Link } from "react-router-dom";

import "./DashboardSubjectTableCard.css";

export default function DashboardSubjectTableCard({
  title,
  rows,
  actionLabel = "View all subjects",
  actionPath,
}) {
  return (
    <article className="dashboard-subject-table-card">
      <div className="dashboard-subject-table-head">
        <h2>{title}</h2>
      </div>

      <div className="dashboard-subject-table">
        <div className="dashboard-subject-table-row is-head">
          <span>Subject</span>
          <span>Attendance</span>
          <span>%</span>
          <span>Status</span>
        </div>

        {rows.map((row) => (
          <div key={row.key || row.subject} className="dashboard-subject-table-row">
            <div className="dashboard-subject-table-subject">
              <i style={{ backgroundColor: row.color }} aria-hidden="true" />
              <div>
                <strong>{row.subject}</strong>
                <div className="dashboard-subject-progress" aria-hidden="true">
                  <div style={{ width: `${row.percentageValue}%`, background: row.color }} />
                </div>
              </div>
            </div>
            <span>
              {row.attended}/{row.total}
            </span>
            <span>{row.percentage}</span>
            <span className={`dashboard-subject-status ${row.status === "danger" ? "status-danger" : "status-safe"}`}>
              {row.status === "danger"
                ? `Need ${row.classesNeeded} classes`
                : `Can bunk ${row.bunksAllowed}`}
            </span>
          </div>
        ))}
      </div>

      {actionPath ? (
        <Link to={actionPath} className="dashboard-soft-action">
          {actionLabel}
          <span aria-hidden="true">→</span>
        </Link>
      ) : (
        <button type="button" className="dashboard-soft-action">
          {actionLabel}
          <span aria-hidden="true">→</span>
        </button>
      )}
    </article>
  );
}
