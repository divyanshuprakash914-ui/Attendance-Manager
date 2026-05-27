import { Link } from "react-router-dom";

import DashboardIcon from "./DashboardIcon";
import "./DashboardSidebar.css";

export default function DashboardSidebar({
  items,
  activeItem,
  profileName = "Vani",
  profileRole = "Student",
}) {
  const avatarLetter = profileName?.charAt(0)?.toUpperCase() || "V";

  return (
    <aside className="dashboard-sidebar">
      <div className="dashboard-sidebar-brand">
        <Link to="/" className="dashboard-sidebar-brand-link">
          <span className="dashboard-sidebar-brand-mark">
            <DashboardIcon name="book-open" />
          </span>
          <div>
            <strong>AttendEase</strong>
            <span>Smart Attendance</span>
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
              <span className="dashboard-sidebar-link-label">{item.label}</span>
              {item.badge ? <small className="dashboard-sidebar-link-badge">{item.badge}</small> : null}
            </Link>
          ) : (
            <span key={item.label} className="dashboard-sidebar-link is-disabled">
              <span className="dashboard-sidebar-icon">
                <DashboardIcon name={item.icon} />
              </span>
              <span className="dashboard-sidebar-link-label">{item.label}</span>
              {item.badge ? <small className="dashboard-sidebar-link-badge">{item.badge}</small> : null}
            </span>
          ),
        )}
      </nav>

      <div className="dashboard-sidebar-profile">
        <div className="dashboard-sidebar-avatar">{avatarLetter}</div>
        <div>
          <strong>{profileName}</strong>
          <span>{profileRole}</span>
        </div>
        <span className="dashboard-sidebar-profile-arrow" aria-hidden="true">
          ›
        </span>
      </div>
    </aside>
  );
}
