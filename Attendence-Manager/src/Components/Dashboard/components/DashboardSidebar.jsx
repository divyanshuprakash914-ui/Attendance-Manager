import { Link } from "react-router-dom";

import DashboardIcon from "./DashboardIcon";
import "./DashboardSidebar.css";

export default function DashboardSidebar({ items, activeItem }) {
  return (
    <aside className="dashboard-sidebar">
      <div className="dashboard-sidebar-brand">
        <Link to="/" className="dashboard-sidebar-brand-link">
          <span className="dashboard-sidebar-brand-mark">A</span>
          <div>
            <strong>AttendEase</strong>
            <span>Campus workspace</span>
          </div>
        </Link>
      </div>

      <nav className="dashboard-sidebar-nav" aria-label="Dashboard navigation">
        {items.map((item) =>
          item.path ? (
            <Link
              key={item.label}
              to={item.path}
              className={`dashboard-sidebar-link ${activeItem === item.label ? "is-active" : ""}`}
            >
              <span className="dashboard-sidebar-icon">
                <DashboardIcon name={item.icon} />
              </span>
              <span>{item.label}</span>
            </Link>
          ) : (
            <span key={item.label} className="dashboard-sidebar-link is-disabled">
              <span className="dashboard-sidebar-icon">
                <DashboardIcon name={item.icon} />
              </span>
              <span>{item.label}</span>
            </span>
          ),
        )}
      </nav>

      <div className="dashboard-sidebar-profile">
        <div className="dashboard-sidebar-avatar">DP</div>
        <div>
          <strong>Divyanshu Prakash</strong>
          <span>Admin coordinator</span>
        </div>
      </div>
    </aside>
  );
}
