import { Link } from "react-router-dom";

import "./DashboardTodayClassesCard.css";

export default function DashboardTodayClassesCard({
  title,
  subtitle,
  items,
  actionLabel = "View full timetable",
  actionPath,
}) {
  return (
    <article className="dashboard-today-classes-card">
      <div className="dashboard-today-classes-head">
        <h2>
          {title} <span>({subtitle})</span>
        </h2>
      </div>

      <div className="dashboard-today-classes-list">
        {items.length ? (
          items.map((item) => (
            <div key={`${item.time}-${item.key || item.subject}`} className="dashboard-today-class-card">
              <div className="dashboard-today-class-copy">
                <h3>{item.subject}</h3>
                <p>{item.time}</p>
              </div>

              <span className={item.action === "must_attend" ? "badge-danger" : "badge-safe"}>
                {item.action === "must_attend" ? "Must Attend" : "Safe"}
              </span>
            </div>
          ))
        ) : (
          <div className="dashboard-today-classes-empty">No classes scheduled for today.</div>
        )}
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
