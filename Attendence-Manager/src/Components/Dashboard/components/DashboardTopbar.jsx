import "./DashboardTopbar.css";

export default function DashboardTopbar() {
  return (
    <header className="dashboard-topbar">
      <button type="button" className="dashboard-workspace-pill">
        <span>AttendEase Campus</span>
        <span className="dashboard-workspace-caret" aria-hidden="true">
          ▾
        </span>
      </button>

      <div className="dashboard-topbar-tools">
        <label className="dashboard-search">
          <span className="dashboard-search-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="6.5" />
              <path d="m16 16 4 4" />
            </svg>
          </span>
          <input type="search" placeholder="Search..." />
        </label>

        <button type="button" className="dashboard-alert-button" aria-label="Notifications">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15 17H5.5a1.5 1.5 0 0 1-1.2-2.4l1.2-1.6V9a6 6 0 0 1 12 0v4l1.2 1.6a1.5 1.5 0 0 1-1.2 2.4H9" />
            <path d="M10 20a2.4 2.4 0 0 0 4 0" />
          </svg>
          <span className="dashboard-alert-dot" />
        </button>

        <div className="dashboard-topbar-avatar">DP</div>
      </div>
    </header>
  );
}
