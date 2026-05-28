import { Link } from "react-router-dom";

import DashboardSidebar from "../../Dashboard/components/DashboardSidebar";
import DashboardTopbar from "../../Dashboard/components/DashboardTopbar";
import useDashboardAccess from "../../Dashboard/useDashboardAccess";
import DashboardWorkspaceProvider from "../DashboardWorkspaceProvider";
import "../DashboardPages.css";
import "../../Dashboard/Dashboard.css";

export default function DashboardWorkspaceLayout({
  activeItem,
  profileName = "Vani",
  profileRole = "Student",
  contentClassName = "",
  children,
}) {
  const { dashboardData, user, profile, profileUnlocked, navigationItems, loading, error } = useDashboardAccess();
  const resolvedName = profile.name || user.name || profileName;
  const resolvedRole = profile.role || user.role || profileRole;

  if (loading) {
    return <div className="dashboard-feedback-state">Loading workspace...</div>;
  }

  if (error) {
    return <div className="dashboard-feedback-state is-error">{error}</div>;
  }

  if (!dashboardData) {
    return <div className="dashboard-feedback-state">No dashboard data found.</div>;
  }

  return (
    <DashboardWorkspaceProvider
      value={{
        dashboardData,
        user,
        profile,
        profileUnlocked,
        navigationItems,
        resolvedName,
        resolvedRole,
      }}
    >
      <div className="dashboard-page">
        <div className="dashboard-shell">
          <DashboardSidebar
            items={navigationItems}
            activeItem={profileUnlocked ? activeItem : "Dashboard"}
            profileName={resolvedName}
            profileRole={resolvedRole}
          />

          <div className="dashboard-main">
            <DashboardTopbar profileName={resolvedName} />

            <main className={["dashboard-content", "dashboard-route-content", contentClassName].filter(Boolean).join(" ")}>
              {profileUnlocked ? (
                children
              ) : (
                <section className="dashboard-route-locked">
                  <span className="dashboard-kicker">Profile setup required</span>
                  <h1>Complete your profile first</h1>
                  <p>Only dashboard and settings are available until your profile completion reaches 85%.</p>
                  <Link to="/dashboard/settings" className="dashboard-onboarding-primary">
                    Open settings
                  </Link>
                </section>
              )}
            </main>
          </div>
        </div>
      </div>
    </DashboardWorkspaceProvider>
  );
}
