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
  const safeValues = values.length ? values : [0];
  const safeLabels = labels.length ? labels : ["No data"];
  const max = Math.max(...safeValues, 1);

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
          {safeValues.map((value, index) => (
            <div key={`${safeLabels[index]}-${value}`} className="dashboard-mini-bar-group">
              <span className="dashboard-mini-bar-value">{formatValue(value)}</span>
              <div className="dashboard-mini-bar-rail">
                <div
                  className="dashboard-mini-bar-fill"
                  style={{ height: `${Math.max((value / max) * 100, 10)}%` }}
                />
              </div>
              <small>{safeLabels[index]}</small>
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
