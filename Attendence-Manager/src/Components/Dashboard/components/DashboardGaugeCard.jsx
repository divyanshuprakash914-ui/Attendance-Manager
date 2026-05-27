import "./DashboardGaugeCard.css";

export default function DashboardGaugeCard({ title, subtitle, value, maxLabel, ratio }) {
  const angle = `${Math.max(0, Math.min(ratio, 1)) * 180}deg`;

  return (
    <article className="dashboard-gauge-card">
      <div className="dashboard-gauge-card-head">
        <h2>{title}</h2>
        <span>{subtitle}</span>
      </div>

      <div className="dashboard-gauge-visual">
        <div className="dashboard-gauge-ring" style={{ "--dashboard-gauge-angle": angle }} />
        <div className="dashboard-gauge-inner" />
        <div className="dashboard-gauge-readout">
          <strong>{value}</strong>
          <span>0K</span>
          <span>{maxLabel}</span>
        </div>
      </div>
    </article>
  );
}
