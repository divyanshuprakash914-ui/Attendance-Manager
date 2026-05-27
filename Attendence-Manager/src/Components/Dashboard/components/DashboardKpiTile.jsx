import DashboardIcon from "./DashboardIcon";
import "./DashboardKpiTile.css";

export default function DashboardKpiTile({ title, subtitle, value, delta, trend, icon }) {
  return (
    <article className="dashboard-kpi-tile">
      <div className="dashboard-kpi-tile-head">
        <div>
          <h2>{title}</h2>
          <span>{subtitle}</span>
        </div>

        <span className="dashboard-kpi-icon">
          <DashboardIcon name={icon} />
        </span>
      </div>

      <div className="dashboard-kpi-tile-foot">
        <strong>{value}</strong>
        <small className={`dashboard-kpi-delta ${trend === "down" ? "is-down" : ""}`}>
          {delta}
        </small>
      </div>
    </article>
  );
}
