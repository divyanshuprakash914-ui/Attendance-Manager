import { Link } from "react-router-dom";

import "./DashboardAssignmentsCard.css";

export default function DashboardAssignmentsCard({
  title,
  badge,
  subtitle,
  completed,
  total,
  items,
  actionLabel = "Go to Assignments Solver",
  actionPath,
}) {
  const progress = (completed / total) * 100;

  return (
    <article className="dashboard-assignments-card">
      <div className="dashboard-assignments-head">
        <div>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>

        <span>{badge}</span>
      </div>

      <div className="dashboard-assignments-body">
        <div className="dashboard-assignments-donut-wrap">
          <div
            className="dashboard-assignments-donut"
            style={{ "--assignment-progress-target": `${progress * 3.6}deg` }}
          >
            <div className="dashboard-assignments-donut-inner">
              <strong>
                {completed} / {total}
              </strong>
              <small>Completed</small>
            </div>
          </div>
        </div>

        <div className="dashboard-assignments-list">
          {items.map((item, index) => (
            <div key={item.label} className="dashboard-assignments-item">
              <div className="dashboard-assignments-item-copy">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
              <div className="dashboard-assignments-track">
                <div
                  style={{
                    "--assignment-item-progress": `${item.progress}%`,
                    "--assignment-item-color": item.color,
                    "--assignment-item-delay": `${index * 0.08}s`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
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
