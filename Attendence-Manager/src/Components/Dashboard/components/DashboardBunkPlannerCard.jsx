import { Link } from "react-router-dom";

import "./DashboardBunkPlannerCard.css";

function formatRiskLabel(risk) {
  if (!risk) {
    return "Stable";
  }

  return String(risk)
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default function DashboardBunkPlannerCard({
  title,
  subtitle,
  note,
  days,
  bestDay,
  actionLabel = "Go to bunk planner",
  actionPath,
}) {
  return (
    <article className="dashboard-bunk-planner-card">
      <div className="dashboard-bunk-planner-head">
        <h2>
          {title} <span>— {subtitle}</span>
        </h2>
        <p>{note}</p>
      </div>

      <div className="dashboard-bunk-day-grid">
        {days.length ? (
          days.map((day) => (
            <div key={day.day} className="dashboard-bunk-day-card">
              <div className="dashboard-bunk-day-copy">
                <h3>{day.day}</h3>
                <p>
                  {day.classes} {day.classes === 1 ? "class" : "classes"}
                </p>
              </div>

              <div className="dashboard-bunk-day-metric">
                <h4>{day.percentage}%</h4>
                <p className={`risk-${day.risk}`}>{formatRiskLabel(day.risk)}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="dashboard-bunk-planner-empty">No leave recommendations available yet.</div>
        )}
      </div>

      <div className="dashboard-bunk-planner-summary">
        <span>Best leave day: {bestDay}</span>
        <button type="button" aria-label="Approve suggestion">
          👍
        </button>
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
