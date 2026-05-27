import "./DashboardTrendCard.css";

function buildLine(values) {
  const width = 620;
  const height = 240;
  const paddingX = 28;
  const paddingY = 30;
  const min = 0;
  const max = 100;
  const step = (width - paddingX * 2) / (values.length - 1);

  const coords = values.map((value, index) => {
    const x = paddingX + step * index;
    const y = height - paddingY - ((value - min) / (max - min)) * (height - paddingY * 2);
    return { x, y, value };
  });

  const line = coords.map(({ x, y }) => `${x},${y}`).join(" ");
  const area = `${paddingX},${height - paddingY} ${line} ${paddingX + step * (values.length - 1)},${height - paddingY}`;
  const lineLength = coords.slice(1).reduce((sum, point, index) => {
    const previous = coords[index];
    return sum + Math.hypot(point.x - previous.x, point.y - previous.y);
  }, 0);

  return { width, height, coords, line, area, lineLength };
}

export default function DashboardTrendCard({ title, subtitle, legend, labels, values }) {
  const chart = buildLine(values);

  return (
    <article className="dashboard-trend-card">
      <div className="dashboard-trend-card-head">
        <div>
          <h2>
            {title} <span>({subtitle})</span>
          </h2>
          <p>{legend}</p>
        </div>
      </div>

      <div className="dashboard-trend-chart-wrap">
        <svg viewBox={`0 0 ${chart.width} ${chart.height}`} className="dashboard-trend-svg" aria-hidden="true">
          {[0, 20, 40, 60, 80, 100].map((tick) => {
            const y = chart.height - 30 - (tick / 100) * (chart.height - 60);
            return (
              <g key={tick}>
                <line x1="24" y1={y} x2={chart.width - 20} y2={y} className="dashboard-trend-gridline" />
                <text x="2" y={y + 4} className="dashboard-trend-axis-label">
                  {tick}%
                </text>
              </g>
            );
          })}

          <polygon points={chart.area} className="dashboard-trend-area" />
          <polyline
            points={chart.line}
            className="dashboard-trend-line"
            style={{ "--dashboard-line-length": chart.lineLength }}
          />

          {chart.coords.map((point, index) => (
            <g
              key={labels[index]}
              className="dashboard-trend-point-group"
              style={{ "--dashboard-point-delay": `${index * 0.08}s` }}
            >
              <circle cx={point.x} cy={point.y} r="5" className="dashboard-trend-dot" />
              <text x={point.x} y={point.y - 14} className="dashboard-trend-value">
                {point.value}%
              </text>
            </g>
          ))}
        </svg>

        <div className="dashboard-trend-labels">
          {labels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
      </div>
    </article>
  );
}
