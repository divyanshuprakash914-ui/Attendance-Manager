import { Link } from "react-router-dom";

import "./DashboardLowAttendanceCard.css";

function buildSegments(segments) {
  const total = segments.reduce((sum, item) => sum + item.value, 0) || 1;
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return segments.map((segment) => {
    const stroke = (segment.value / total) * circumference;
    const current = { ...segment, stroke, offset };
    offset += stroke;
    return current;
  });
}

export default function DashboardLowAttendanceCard({
  title,
  subtitle,
  segments,
  actionLabel = "View all subjects",
  actionPath,
}) {
  const chart = buildSegments(segments);
  const circumference = 2 * Math.PI * 58;

  return (
    <article className="dashboard-low-attendance-card">
      <div className="dashboard-low-attendance-head">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>

      <div className="dashboard-low-attendance-body">
        <div className="dashboard-low-attendance-donut-wrap">
          <svg viewBox="0 0 180 180" className="dashboard-low-attendance-donut" aria-hidden="true">
            <circle cx="90" cy="90" r="58" className="dashboard-low-attendance-base" />
            {chart.map((segment, index) => (
              <circle
                key={segment.label}
                cx="90"
                cy="90"
                r="58"
                className="dashboard-low-attendance-segment"
                style={{
                  stroke: segment.color,
                  "--dashboard-segment-stroke": segment.stroke,
                  "--dashboard-segment-rest": circumference,
                  "--dashboard-segment-offset": segment.offset,
                  "--dashboard-segment-delay": `${index * 0.1}s`,
                }}
              />
            ))}
          </svg>

          <div className="dashboard-low-attendance-center">
            <strong>{segments.length}</strong>
            <span>Subjects</span>
          </div>
        </div>

        <div className="dashboard-low-attendance-list">
          {segments.length ? (
            segments.map((segment, index) => (
              <div key={segment.label} className="dashboard-low-attendance-item">
                <div className="dashboard-low-attendance-subject">
                  <i style={{ backgroundColor: segment.color }} aria-hidden="true" />
                  <span>{segment.label}</span>
                </div>
                <strong style={{ "--dashboard-item-delay": `${index * 0.06}s` }}>
                  {segment.value.toFixed(1)}%
                </strong>
              </div>
            ))
          ) : (
            <div className="dashboard-low-attendance-item">
              <div className="dashboard-low-attendance-subject">
                <i style={{ backgroundColor: "#1db954" }} aria-hidden="true" />
                <span>No live risks right now</span>
              </div>
              <strong>0</strong>
            </div>
          )}
        </div>
      </div>

      {actionPath && actionLabel ? (
        <Link to={actionPath} className="dashboard-low-attendance-button">
          {actionLabel}
          <span aria-hidden="true">→</span>
        </Link>
      ) : null}
    </article>
  );
}
