import "./Dashboard.css";
import { activitySeries, dashboardStats, recentActivity, sidebarItems } from "./DashboardData";
import DashboardActivityPanel from "./components/DashboardActivityPanel";
import DashboardRecentActivity from "./components/DashboardRecentActivity";
import DashboardSidebar from "./components/DashboardSidebar";
import DashboardStatCard from "./components/DashboardStatCard";
import DashboardTopbar from "./components/DashboardTopbar";

export default function Dashboard() {
  return (
    <div className="dashboard-page">
      <div className="dashboard-shell">
        <DashboardSidebar items={sidebarItems} />

        <div className="dashboard-main">
          <DashboardTopbar />

          <main className="dashboard-content">
            <section className="dashboard-intro">
              <span className="dashboard-kicker">Attendance workspace</span>
              <h1>Overview</h1>
              <p>Here is what is happening across your campus operations.</p>
            </section>

            <section className="dashboard-stats-grid">
              {dashboardStats.map((stat) => (
                <DashboardStatCard key={stat.label} {...stat} />
              ))}
            </section>

            <section className="dashboard-panels-grid">
              <DashboardActivityPanel
                labels={activitySeries.labels}
                points={activitySeries.points}
              />
              <DashboardRecentActivity items={recentActivity} />
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
