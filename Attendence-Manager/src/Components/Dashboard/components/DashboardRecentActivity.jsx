import "./DashboardRecentActivity.css";

export default function DashboardRecentActivity({ items }) {
  return (
    <article className="dashboard-recent-panel">
      <div className="dashboard-panel-heading">
        <div>
          <h2>Recent Activity</h2>
          <p>Latest updates from your attendance workspace.</p>
        </div>
      </div>

      <div className="dashboard-recent-list">
        {items.map((item) => (
          <article key={`${item.title}-${item.time}`} className="dashboard-recent-item">
            <span className="dashboard-recent-dot" aria-hidden="true" />
            <div>
              <strong>{item.title}</strong>
              <p>{item.meta}</p>
              <span>{item.time}</span>
            </div>
          </article>
        ))}
      </div>
    </article>
  );
}
