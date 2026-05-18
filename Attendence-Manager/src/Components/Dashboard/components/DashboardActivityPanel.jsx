import "./DashboardActivityPanel.css";

function buildChart(points) {
  const width = 760;
  const height = 260;
  const paddingX = 22;
  const paddingY = 24;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const step = (width - paddingX * 2) / (points.length - 1);

  const coords = points.map((point, index) => {
    const x = paddingX + step * index;
    const y = height - paddingY - ((point - min) / range) * (height - paddingY * 2);
    return { x, y };
  });

  const line = coords.map(({ x, y }) => `${x},${y}`).join(" ");
  const area = `${paddingX},${height - paddingY} ${line} ${paddingX + step * (points.length - 1)},${height - paddingY}`;

  return { width, height, coords, line, area };
}

export default function DashboardActivityPanel({ labels, points }) {
  const chart = buildChart(points);

  return (
    <article className="dashboard-activity-panel">
      <div className="dashboard-panel-heading">
        <div>
          <h2>Activity</h2>
          <p>Attendance submissions over the last 12 weeks.</p>
        </div>
        <a href="/dashboard">View all ↗</a>
      </div>

      <div className="dashboard-chart-frame">
        <svg viewBox={`0 0 ${chart.width} ${chart.height}`} className="dashboard-chart-svg" aria-hidden="true">
          {[0, 1, 2, 3].map((line) => {
            const y = 28 + line * 56;
            return <line key={line} x1="18" y1={y} x2={chart.width - 18} y2={y} className="dashboard-chart-gridline" />;
          })}

          <polygon points={chart.area} className="dashboard-chart-area" />
          <polyline points={chart.line} className="dashboard-chart-line" />

          {chart.coords.map(({ x, y }, index) => (
            <circle key={labels[index]} cx={x} cy={y} r="4.5" className="dashboard-chart-dot" />
          ))}
        </svg>

        <div className="dashboard-chart-labels">
          {labels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
      </div>
    </article>
  );
}
