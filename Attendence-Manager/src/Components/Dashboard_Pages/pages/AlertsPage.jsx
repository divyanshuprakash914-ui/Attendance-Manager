import DashboardDonutCard from "../../Dashboard/components/DashboardDonutCard";
import DashboardMiniBarsCard from "../../Dashboard/components/DashboardMiniBarsCard";
import DashboardOverviewStatCard from "../../Dashboard/components/DashboardOverviewStatCard";
import { alertsPageData as data } from "../DashboardPagesData";
import DashboardListPanel from "../components/DashboardListPanel";
import DashboardPageHeader from "../components/DashboardPageHeader";
import DashboardTablePanel from "../components/DashboardTablePanel";
import DashboardWorkspaceLayout from "../components/DashboardWorkspaceLayout";

export default function AlertsPage() {
  return (
    <DashboardWorkspaceLayout activeItem="Alerts">
      <DashboardPageHeader {...data.header} />

      <section className="dashboard-page-stats-grid">
        {data.stats.map((item) => (
          <DashboardOverviewStatCard key={item.title} {...item} />
        ))}
      </section>

      <section className="dashboard-page-grid-wide">
        <DashboardDonutCard {...data.severityMix} />
        <DashboardListPanel {...data.liveAlerts} actionLabel="Review all alerts" actionPath="/dashboard/alerts" />
      </section>

      <section className="dashboard-page-grid-two">
        <DashboardMiniBarsCard {...data.alertVolume} />
        <DashboardTablePanel {...data.automationTable} actionLabel="Open automation rules" actionPath="/dashboard/settings" />
      </section>

      <DashboardListPanel {...data.escalationPath} actionLabel="Go to leave tracker" actionPath="/dashboard/leave-tracker" />
    </DashboardWorkspaceLayout>
  );
}
