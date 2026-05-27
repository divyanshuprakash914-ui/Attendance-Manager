import DashboardMiniBarsCard from "../../Dashboard/components/DashboardMiniBarsCard";
import DashboardOverviewStatCard from "../../Dashboard/components/DashboardOverviewStatCard";
import DashboardStackedBarChartCard from "../../Dashboard/components/DashboardStackedBarChartCard";
import { timetablePageData as data } from "../DashboardPagesData";
import DashboardListPanel from "../components/DashboardListPanel";
import DashboardPageHeader from "../components/DashboardPageHeader";
import DashboardScheduleBoard from "../components/DashboardScheduleBoard";
import DashboardTablePanel from "../components/DashboardTablePanel";
import DashboardWorkspaceLayout from "../components/DashboardWorkspaceLayout";

export default function TimetablePage() {
  return (
    <DashboardWorkspaceLayout activeItem="Timetable">
      <DashboardPageHeader {...data.header} />

      <section className="dashboard-page-stats-grid">
        {data.stats.map((item) => (
          <DashboardOverviewStatCard key={item.title} {...item} />
        ))}
      </section>

      <section className="dashboard-page-grid-wide">
        <DashboardScheduleBoard {...data.schedule} actionLabel="Go to live timetable" actionPath="/dashboard/timetable" />
        <DashboardListPanel {...data.nextWindows} actionLabel="Open day planner" actionPath="/dashboard/bunk-planner" />
      </section>

      <section className="dashboard-page-grid-two">
        <DashboardStackedBarChartCard {...data.roomUsage} />
        <DashboardMiniBarsCard {...data.dayLoad} />
      </section>

      <DashboardTablePanel {...data.handoffTable} actionLabel="Open timetable requests" actionPath="/dashboard/reports" />
    </DashboardWorkspaceLayout>
  );
}
