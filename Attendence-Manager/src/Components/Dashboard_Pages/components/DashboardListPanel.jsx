import { Link } from "react-router-dom";

export default function DashboardListPanel({ title, subtitle, items, actionLabel, actionPath }) {
  return (
    <article className="dashboard-page-panel">
      <div className="dashboard-page-panel-head">
        <div>
          <h2>{title}</h2>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
      </div>

      <div className="dashboard-list-panel-list">
        {items.map((item) => (
          <div key={item.label} className="dashboard-list-panel-item">
            <span className={`dashboard-list-panel-dot tone-${item.tone || "purple"}`} aria-hidden="true" />

            <div className="dashboard-list-panel-copy">
              <strong>{item.label}</strong>
              {item.description ? <p>{item.description}</p> : null}
            </div>

            {(item.value || item.meta) ? (
              <div className="dashboard-list-panel-meta">
                {item.value ? (
                  <strong className={`dashboard-list-panel-value tone-${item.tone || "purple"}`}>
                    {item.value}
                  </strong>
                ) : null}
                {item.meta ? <span>{item.meta}</span> : null}
              </div>
            ) : null}
          </div>
        ))}
      </div>

      {actionLabel && actionPath ? (
        <Link to={actionPath} className="dashboard-page-link">
          {actionLabel}
          <span aria-hidden="true">→</span>
        </Link>
      ) : null}
    </article>
  );
}
