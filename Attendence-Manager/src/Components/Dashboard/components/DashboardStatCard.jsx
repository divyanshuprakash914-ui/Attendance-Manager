import DashboardIcon from "./DashboardIcon";
import "./DashboardStatCard.css";

export default function DashboardStatCard({ icon, value, label, delta, trend }) {
  return (
    <article className="dashboard-stat-card">
      <div className="dashboard-stat-card-top">
        <span className="dashboard-stat-card-icon">
          <DashboardIcon name={icon} />
        </span>
        <span className={`dashboard-stat-card-delta ${trend === "down" ? "is-down" : ""}`}>
          {delta}
        </span>
      </div>

      <strong>{value}</strong>
      <span>{label}</span>
    </article>
  );
}
