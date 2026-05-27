import { Link } from "react-router-dom";

import "./DashboardLeaveScenarioCard.css";

export default function DashboardLeaveScenarioCard({
  title,
  day,
  attendAll,
  leaveOne,
  actionLabel = "Compare more scenarios",
  actionPath,
}) {
  return (
    <article className="dashboard-leave-scenario-card">
      <div className="dashboard-leave-scenario-head">
        <h2>{title}</h2>
        <p>Day: {day}</p>
      </div>

      <div className="dashboard-leave-scenario-list">
        <div className="dashboard-leave-scenario-item tone-green">
          <div>
            <strong>If attend all</strong>
            <span>Keep every class for the day.</span>
          </div>

          <div className="dashboard-leave-scenario-metric">
            <strong>{attendAll.percentage}</strong>
            <small>{attendAll.ratio}</small>
          </div>
        </div>

        <div className="dashboard-leave-scenario-item tone-amber">
          <div>
            <strong>If leave one class</strong>
            <span>Drop a single lecture if needed.</span>
          </div>

          <div className="dashboard-leave-scenario-metric">
            <strong>{leaveOne.percentage}</strong>
            <small>{leaveOne.ratio}</small>
          </div>
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
