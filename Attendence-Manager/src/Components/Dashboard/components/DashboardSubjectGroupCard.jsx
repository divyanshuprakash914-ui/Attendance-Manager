import "./DashboardSubjectGroupCard.css";

function formatLabelLines(label) {
  const parts = label.split(" + ");

  if (parts.length === 1) {
    return [label];
  }

  return parts.map((part, index) => (index < parts.length - 1 ? `${part} +` : part));
}

export default function DashboardSubjectGroupCard({ title, bars }) {
  return (
    <article className="dashboard-subject-group-card">
      <div className="dashboard-subject-group-head">
        <h2>{title}</h2>
      </div>

      <div className="dashboard-subject-group-chart">
        <div className="dashboard-subject-group-axis">
          <span>100%</span>
          <span>75%</span>
          <span>50%</span>
          <span>25%</span>
          <span>0%</span>
        </div>

        <div className="dashboard-subject-group-bars">
          {bars.map((bar, index) => (
            <div key={bar.label} className="dashboard-subject-group-bar">
              <strong>{bar.value.toFixed(1)}%</strong>
              <div className="dashboard-subject-group-bar-track">
                <div
                  className="dashboard-subject-group-bar-fill"
                  style={{
                    "--dashboard-bar-height": `${bar.value}%`,
                    "--dashboard-bar-color": bar.color,
                    "--dashboard-bar-delay": `${index * 0.08}s`,
                  }}
                />
              </div>
              <span>
                {formatLabelLines(bar.label).map((line, lineIndex) => (
                  <small key={`${bar.label}-${lineIndex}`}>{line}</small>
                ))}
              </span>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
