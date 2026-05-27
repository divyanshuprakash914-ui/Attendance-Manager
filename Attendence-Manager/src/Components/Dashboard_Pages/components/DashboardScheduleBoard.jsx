import { Link } from "react-router-dom";

export default function DashboardScheduleBoard({
  title,
  subtitle,
  days,
  actionLabel,
  actionPath,
}) {
  return (
    <article className="dashboard-page-panel">
      <div className="dashboard-page-panel-head">
        <div>
          <h2>{title}</h2>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
      </div>

      <div className="dashboard-schedule-board-grid">
        {days.map((day) => (
          <section key={day.label} className="dashboard-schedule-day">
            <div className="dashboard-schedule-day-head">
              <strong>{day.label}</strong>
              <span>{day.summary}</span>
            </div>

            <div className="dashboard-schedule-blocks">
              {day.blocks.map((block) => (
                <div key={`${day.label}-${block.time}-${block.subject}`} className={`dashboard-schedule-block tone-${block.tone}`}>
                  <strong>{block.subject}</strong>
                  <span>{block.time}</span>
                  <small>{block.meta}</small>
                </div>
              ))}
            </div>
          </section>
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
