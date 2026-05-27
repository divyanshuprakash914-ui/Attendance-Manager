import "./DashboardStackedBarChartCard.css";

function formatValue(value) {
  if (value >= 1000) {
    return `${Math.round(value / 100) / 10}K`;
  }

  return `${value}`;
}

function buildChart(categories) {
  const width = 620;
  const height = 260;
  const left = 54;
  const right = 18;
  const top = 20;
  const bottom = 34;
  const plotHeight = height - top - bottom;
  const plotWidth = width - left - right;
  const barWidth = 58;
  const gap = (plotWidth - barWidth * categories.length) / Math.max(categories.length - 1, 1);
  const max = Math.max(...categories.map((item) => item.verified + item.pending));
  const ceiling = Math.ceil(max / 2000) * 2000;

  const bars = categories.map((item, index) => {
    const total = item.verified + item.pending;
    const verifiedHeight = (item.verified / ceiling) * plotHeight;
    const pendingHeight = (item.pending / ceiling) * plotHeight;
    const x = left + index * (barWidth + gap);
    const baseY = height - bottom;

    return {
      ...item,
      x,
      baseY,
      verifiedHeight,
      pendingHeight,
      total,
    };
  });

  return { width, height, left, right, top, bottom, plotHeight, ceiling, bars };
}

export default function DashboardStackedBarChartCard({ title, subtitle, legend, categories }) {
  const chart = buildChart(categories);
  const gridLevels = [0, 0.3, 1];

  return (
    <article className="dashboard-stacked-chart-card">
      <div className="dashboard-stacked-chart-head">
        <div>
          <h2>{title}</h2>
          <span>{subtitle}</span>
        </div>

        <div className="dashboard-stacked-chart-legend">
          {legend.map((item) => (
            <span key={item.label}>
              <i style={{ backgroundColor: item.color }} aria-hidden="true" />
              {item.label}
            </span>
          ))}
        </div>
      </div>

      <div className="dashboard-stacked-chart-frame">
        <svg
          viewBox={`0 0 ${chart.width} ${chart.height}`}
          className="dashboard-stacked-chart-svg"
          aria-hidden="true"
        >
          {gridLevels.map((level) => {
            const value = chart.ceiling * level;
            const y = chart.top + (1 - level) * chart.plotHeight;

            return (
              <g key={level}>
                <line
                  x1={chart.left}
                  y1={y}
                  x2={chart.width - chart.right}
                  y2={y}
                  className="dashboard-stacked-gridline"
                />
                <text x="10" y={y + 5} className="dashboard-stacked-axis-label">
                  {formatValue(value)}
                </text>
              </g>
            );
          })}

          {chart.bars.map((bar) => {
            const pendingY = bar.baseY - bar.pendingHeight;
            const verifiedY = bar.baseY - bar.pendingHeight - bar.verifiedHeight;

            return (
              <g key={bar.label}>
                <rect
                  x={bar.x}
                  y={pendingY}
                  width="58"
                  height={bar.pendingHeight}
                  rx="4"
                  className="dashboard-stacked-pending"
                />
                <rect
                  x={bar.x}
                  y={verifiedY}
                  width="58"
                  height={bar.verifiedHeight}
                  rx="4"
                  className="dashboard-stacked-verified"
                />

                {bar.verified > 0 ? (
                  <text
                    x={bar.x + 29}
                    y={verifiedY + Math.max(bar.verifiedHeight / 2, 14)}
                    className="dashboard-stacked-value dashboard-stacked-value-light"
                  >
                    {formatValue(bar.verified)}
                  </text>
                ) : null}

                {bar.pending > 0 ? (
                  <text
                    x={bar.x + 29}
                    y={pendingY + Math.max(bar.pendingHeight / 2, 14)}
                    className="dashboard-stacked-value"
                  >
                    {formatValue(bar.pending)}
                  </text>
                ) : null}
              </g>
            );
          })}
        </svg>

        <div className="dashboard-stacked-chart-labels">
          {categories.map((item) => (
            <span key={item.label}>
              {item.label.split(" / ").map((part) => (
                <small key={part}>{part}</small>
              ))}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
