import DashboardDonutCard from "../../Dashboard/components/DashboardDonutCard";
import DashboardLeaveScenarioCard from "../../Dashboard/components/DashboardLeaveScenarioCard";
import DashboardMiniBarsCard from "../../Dashboard/components/DashboardMiniBarsCard";
import DashboardOverviewStatCard from "../../Dashboard/components/DashboardOverviewStatCard";
import DashboardListPanel from "../components/DashboardListPanel";
import DashboardPageHeader from "../components/DashboardPageHeader";
import DashboardTablePanel from "../components/DashboardTablePanel";
import DashboardWorkspaceLayout from "../components/DashboardWorkspaceLayout";
import useDashboardPageData from "../useDashboardPageData";

function LeaveTrackerPageContent() {
  const { leaveTrackerPage: data } = useDashboardPageData();

  return (
    <>
      <DashboardPageHeader
        icon="leave"
        eyebrow="Leave Tracker"
        title="Leave tracker"
        description="Check the current leave scenarios, safe windows, and the subjects that still block a clean break."
        chips={[`${data.stats[0]?.value || 0} recommended`, `${data.stats[3]?.value || 0} protected subjects`]}
      />

      <section className="dashboard-page-stats-grid">
        {data.stats.map((item) => (
          <DashboardOverviewStatCard key={item.title} {...item} />
        ))}
      </section>

      <section className="dashboard-page-grid-two">
        <DashboardLeaveScenarioCard {...data.scenario} />
        <DashboardDonutCard {...data.safetyMix} />
      </section>

      <section className="dashboard-page-grid-wide">
        <DashboardTablePanel {...data.requestTable} actionLabel="Open bunk planner" actionPath="/dashboard/bunk-planner" />
        <DashboardListPanel {...data.upcomingApprovals} actionLabel="Check alerts" actionPath="/dashboard/alerts" />
      </section>

      <section className="dashboard-page-grid-two">
        <DashboardMiniBarsCard {...data.leaveFlow} />
        <DashboardListPanel {...data.conflictNotes} actionLabel="Review weekly timetable" actionPath="/dashboard/timetable" />
      </section>
    </>
  );
}

export default function LeaveTrackerPage() {
  return (
    <DashboardWorkspaceLayout activeItem="Leave Tracker">
      <LeaveTrackerPageContent />
    </DashboardWorkspaceLayout>
  );
}
