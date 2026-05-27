import "./DashboardHeroMetric.css";

export default function DashboardHeroMetric({ title, subtitle, value, note }) {
  return (
    <article className="dashboard-hero-metric">
      <div className="dashboard-hero-metric-head">
        <h2>{title}</h2>
        <span>{subtitle}</span>
      </div>

      <strong>{value}</strong>
      <p>{note}</p>
    </article>
  );
}
