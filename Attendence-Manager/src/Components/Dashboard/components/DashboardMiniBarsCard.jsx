import "./DashboardMiniBarsCard.css";

function formatValue(value) {
  if (value >= 1000) {
    return `${Math.round(value / 100) / 10}K`;
  }

  return `${value}`;
}

export default function DashboardMiniBarsCard({
  title,
  subtitle,
  values,
  labels,
  insights = [],
  className = "",
}) {
  const max = Math.max(...values);

  return (
    <article className={["dashboard-mini-bars-card", className].filter(Boolean).join(" ")}>
      <div className="dashboard-mini-bars-head">
        <h2>{title}</h2>
        <span>{subtitle}</span>
      </div>

      <div className="dashboard-mini-bars-chart">
        <div className="dashboard-mini-bars-axis">
          <span>0K</span>
          <span>{formatValue(Math.round(max / 2))}</span>
          <span>{formatValue(max)}</span>
        </div>

        <div className="dashboard-mini-bars-columns">
          {values.map((value, index) => (
            <div key={`${labels[index]}-${value}`} className="dashboard-mini-bar-group">
              <span className="dashboard-mini-bar-value">{formatValue(value)}</span>
              <div className="dashboard-mini-bar-rail">
                <div
                  className="dashboard-mini-bar-fill"
                  style={{ height: `${Math.max((value / max) * 100, 10)}%` }}
                />
              </div>
              <small>{labels[index]}</small>
            </div>
          ))}
        </div>
      </div>

      {insights.length ? (
        <div className="dashboard-mini-bars-insights">
          {insights.map((item) => (
            <div key={item.label} className="dashboard-mini-bars-insight">
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>
      ) : null}
    </article>
  );
}
