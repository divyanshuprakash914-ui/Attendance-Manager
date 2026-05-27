import { sidebarItems } from "../../Dashboard/DashboardData";
import DashboardSidebar from "../../Dashboard/components/DashboardSidebar";
import DashboardTopbar from "../../Dashboard/components/DashboardTopbar";
import "../DashboardPages.css";
import "../../Dashboard/Dashboard.css";

export default function DashboardWorkspaceLayout({
  activeItem,
  profileName = "Vani",
  profileRole = "Student",
  contentClassName = "",
  children,
}) {
  return (
    <div className="dashboard-page">
      <div className="dashboard-shell">
        <DashboardSidebar
          items={sidebarItems}
          activeItem={activeItem}
          profileName={profileName}
          profileRole={profileRole}
        />

        <div className="dashboard-main">
          <DashboardTopbar />

          <main className={["dashboard-content", "dashboard-route-content", contentClassName].filter(Boolean).join(" ")}>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
