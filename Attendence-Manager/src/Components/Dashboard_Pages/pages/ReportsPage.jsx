import DashboardDonutCard from "../../Dashboard/components/DashboardDonutCard";
import DashboardMiniBarsCard from "../../Dashboard/components/DashboardMiniBarsCard";
import DashboardOverviewStatCard from "../../Dashboard/components/DashboardOverviewStatCard";
import DashboardStackedBarChartCard from "../../Dashboard/components/DashboardStackedBarChartCard";
import { reportsPageData as data } from "../DashboardPagesData";
import DashboardListPanel from "../components/DashboardListPanel";
import DashboardPageHeader from "../components/DashboardPageHeader";
import DashboardTablePanel from "../components/DashboardTablePanel";
import DashboardWorkspaceLayout from "../components/DashboardWorkspaceLayout";

export default function ReportsPage() {
  return (
    <DashboardWorkspaceLayout activeItem="Reports">
      <DashboardPageHeader {...data.header} />

      <section className="dashboard-page-stats-grid">
        {data.stats.map((item) => (
          <DashboardOverviewStatCard key={item.title} {...item} />
        ))}
      </section>

      <section className="dashboard-page-grid-wide">
        <DashboardStackedBarChartCard {...data.reportMix} />
        <DashboardDonutCard {...data.reportDistribution} />
      </section>

      <section className="dashboard-page-grid-two">
        <DashboardMiniBarsCard {...data.exportHistory} />
        <DashboardListPanel {...data.schedules} actionLabel="Open schedules" actionPath="/dashboard/reports" />
      </section>

      <DashboardTablePanel {...data.exportTable} actionLabel="Open report archive" actionPath="/dashboard/reports" />
    </DashboardWorkspaceLayout>
  );
}
