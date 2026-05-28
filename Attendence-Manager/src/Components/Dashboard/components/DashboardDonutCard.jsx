import "./DashboardDonutCard.css";

function buildSegments(segments) {
  const total = segments.reduce((sum, item) => sum + item.value, 0);
  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;
  const safeTotal = total || 1;

  return {
    total,
    radius,
    circumference,
    segments: segments.map((segment) => {
      const stroke = (segment.value / safeTotal) * circumference;
      const current = {
        ...segment,
        stroke,
        offset,
      };
      offset += stroke;
      return current;
    }),
  };
}

export default function DashboardDonutCard({
  title,
  subtitle,
  segments,
  centerLabel = "Flagged",
  centerValue,
  legendFormatter,
  className = "",
}) {
  const chart = buildSegments(segments);

  return (
    <article className={["dashboard-donut-card", className].filter(Boolean).join(" ")}>
      <div className="dashboard-donut-head">
        <h2>{title}</h2>
        <span>{subtitle}</span>
      </div>

      <div className="dashboard-donut-body">
        <div className="dashboard-donut-chart-wrap">
          <svg viewBox="0 0 200 200" className="dashboard-donut-chart" aria-hidden="true">
            <circle cx="100" cy="100" r={chart.radius} className="dashboard-donut-base" />
            {chart.segments.map((segment) => (
              <circle
                key={segment.label}
                cx="100"
                cy="100"
                r={chart.radius}
                className="dashboard-donut-segment"
                style={{
                  stroke: segment.color,
                  strokeDasharray: `${segment.stroke} ${chart.circumference}`,
                  strokeDashoffset: -segment.offset,
                }}
              />
            ))}
          </svg>

          <div className="dashboard-donut-center">
            <strong>{centerValue ?? chart.total}</strong>
            <span>{centerLabel}</span>
          </div>
        </div>

        <div className="dashboard-donut-legend">
          {chart.segments.map((segment) => (
            <div key={segment.label} className="dashboard-donut-legend-item">
              <span className="dashboard-donut-legend-color" style={{ backgroundColor: segment.color }} />
              <div>
                <strong>{segment.label}</strong>
                <small>{legendFormatter ? legendFormatter(segment) : `${segment.value}%`}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
