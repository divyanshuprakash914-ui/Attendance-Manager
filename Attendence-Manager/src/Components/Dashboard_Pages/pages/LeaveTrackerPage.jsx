import DashboardDonutCard from "../../Dashboard/components/DashboardDonutCard";
import DashboardMiniBarsCard from "../../Dashboard/components/DashboardMiniBarsCard";
import DashboardOverviewStatCard from "../../Dashboard/components/DashboardOverviewStatCard";
import { leaveTrackerPageData as data } from "../DashboardPagesData";
import DashboardListPanel from "../components/DashboardListPanel";
import DashboardPageHeader from "../components/DashboardPageHeader";
import DashboardTablePanel from "../components/DashboardTablePanel";
import DashboardWorkspaceLayout from "../components/DashboardWorkspaceLayout";

export default function LeaveTrackerPage() {
  return (
    <DashboardWorkspaceLayout activeItem="Leave Tracker">
      <DashboardPageHeader {...data.header} />

      <section className="dashboard-page-stats-grid">
        {data.stats.map((item) => (
          <DashboardOverviewStatCard key={item.title} {...item} />
        ))}
      </section>

      <section className="dashboard-page-grid-two">
        <DashboardMiniBarsCard {...data.leaveFlow} />
        <DashboardDonutCard {...data.reasonMix} />
      </section>

      <section className="dashboard-page-grid-wide">
        <DashboardTablePanel {...data.requestTable} actionLabel="Open bunk planner" actionPath="/dashboard/bunk-planner" />
        <DashboardListPanel {...data.upcomingApprovals} actionLabel="Check alerts" actionPath="/dashboard/alerts" />
      </section>

      <DashboardListPanel {...data.conflictNotes} actionLabel="Review weekly timetable" actionPath="/dashboard/timetable" />
    </DashboardWorkspaceLayout>
  );
}
