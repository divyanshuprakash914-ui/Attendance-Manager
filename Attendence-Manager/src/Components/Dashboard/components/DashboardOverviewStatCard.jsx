import DashboardIcon from "./DashboardIcon";
import "./DashboardOverviewStatCard.css";

export default function DashboardOverviewStatCard({
  icon,
  title,
  value,
  subtitle,
  accent,
  progress,
  emphasized = false,
}) {
  return (
    <article className={`dashboard-overview-stat-card accent-${accent}`}>
      <div className="dashboard-overview-stat-card-main">
        <span className="dashboard-overview-stat-icon">
          <DashboardIcon name={icon} />
        </span>

        <div className="dashboard-overview-stat-copy">
          <p className={emphasized ? "is-emphasized" : ""}>{title}</p>
          <strong>{value}</strong>
          <span>{subtitle}</span>
        </div>
      </div>

      {typeof progress === "number" ? (
        <div className="dashboard-overview-stat-progress">
          <div style={{ "--dashboard-stat-progress": `${progress}%` }} />
        </div>
      ) : null}
    </article>
  );
}
