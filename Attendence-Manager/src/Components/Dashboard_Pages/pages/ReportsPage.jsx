import DashboardDonutCard from "../../Dashboard/components/DashboardDonutCard";
import DashboardMiniBarsCard from "../../Dashboard/components/DashboardMiniBarsCard";
import DashboardOverviewStatCard from "../../Dashboard/components/DashboardOverviewStatCard";
import DashboardStackedBarChartCard from "../../Dashboard/components/DashboardStackedBarChartCard";
import DashboardListPanel from "../components/DashboardListPanel";
import DashboardPageHeader from "../components/DashboardPageHeader";
import DashboardTablePanel from "../components/DashboardTablePanel";
import DashboardWorkspaceLayout from "../components/DashboardWorkspaceLayout";
import useDashboardPageData from "../useDashboardPageData";

function ReportsPageContent() {
  const { reportsPage: data } = useDashboardPageData();

  return (
    <>
      <DashboardPageHeader
        icon="report"
        eyebrow="Reports"
        title="Attendance report view"
        description="Use the current live attendance data as a cleaner report snapshot before exporting anything else."
        chips={[`${data.stats[0]?.value || 0} subjects`, `${data.stats[2]?.value || 0} at risk`]}
      />

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
    </>
  );
}

export default function ReportsPage() {
  return (
    <DashboardWorkspaceLayout activeItem="Reports">
      <ReportsPageContent />
    </DashboardWorkspaceLayout>
  );
}
