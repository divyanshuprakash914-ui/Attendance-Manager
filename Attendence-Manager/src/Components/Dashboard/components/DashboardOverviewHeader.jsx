import "./DashboardOverviewHeader.css";

export default function DashboardOverviewHeader({ greeting, subtitle, dateLabel }) {
  return (
    <header className="dashboard-overview-header">
      <div className="dashboard-overview-header-copy">
        <h1>{greeting}</h1>
        <p>{subtitle}</p>
      </div>

      <div className="dashboard-overview-header-tools">
        <button type="button" className="dashboard-overview-date-pill">
          <span className="dashboard-overview-date-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <rect x="3" y="5" width="18" height="16" rx="3" />
              <path d="M16 3v4M8 3v4M3 10h18" />
            </svg>
          </span>
          <span>{dateLabel}</span>
        </button>

        <button type="button" className="dashboard-overview-alert" aria-label="Notifications">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15 17H5.5a1.5 1.5 0 0 1-1.2-2.4l1.2-1.6V9a6 6 0 0 1 12 0v4l1.2 1.6a1.5 1.5 0 0 1-1.2 2.4H9" />
            <path d="M10 20a2.4 2.4 0 0 0 4 0" />
          </svg>
          <span className="dashboard-overview-alert-dot" />
        </button>
      </div>
    </header>
  );
}
