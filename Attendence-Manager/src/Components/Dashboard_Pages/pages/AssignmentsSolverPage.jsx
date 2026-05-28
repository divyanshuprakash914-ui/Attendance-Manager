import DashboardAssignmentsCard from "../../Dashboard/components/DashboardAssignmentsCard";
import DashboardDonutCard from "../../Dashboard/components/DashboardDonutCard";
import DashboardMiniBarsCard from "../../Dashboard/components/DashboardMiniBarsCard";
import DashboardOverviewStatCard from "../../Dashboard/components/DashboardOverviewStatCard";
import DashboardListPanel from "../components/DashboardListPanel";
import DashboardPageHeader from "../components/DashboardPageHeader";
import DashboardTablePanel from "../components/DashboardTablePanel";
import DashboardWorkspaceLayout from "../components/DashboardWorkspaceLayout";
import useDashboardPageData from "../useDashboardPageData";

function AssignmentsSolverPageContent() {
  const { assignmentsPage: data } = useDashboardPageData();

  return (
    <>
      <DashboardPageHeader
        icon="spark"
        eyebrow="Assignments Solver"
        title="Assignments"
        description="This page now reflects the live backend state first, then uses timetable pressure to guide work when assignment data is still empty."
        chips={[`${data.stats[0]?.value || 0} open`, `${data.stats[3]?.value || "No feed"}`]}
      />

      <section className="dashboard-page-stats-grid">
        {data.stats.map((item) => (
          <DashboardOverviewStatCard key={item.title} {...item} />
        ))}
      </section>

      <section className="dashboard-page-grid-wide">
        {data.hasAssignments && data.solverCard ? (
          <DashboardAssignmentsCard {...data.solverCard} />
        ) : (
          <article className="dashboard-page-panel">
            <div className="dashboard-page-panel-head">
              <div>
                <h2>Assignment feed not connected yet</h2>
                <p>The backend is returning zero live assignments right now, so this page stays on a real empty state instead of mock content.</p>
              </div>
            </div>

            <div className="dashboard-list-panel-list">
              <div className="dashboard-list-panel-item">
                <span className="dashboard-list-panel-dot tone-blue" aria-hidden="true" />
                <div className="dashboard-list-panel-copy">
                  <strong>No assignment rows available</strong>
                  <p>Once the backend returns assignment items, the live solver card will appear here automatically.</p>
                </div>
              </div>
            </div>
          </article>
        )}
        <DashboardListPanel {...data.suggestions} actionLabel="Open planner signals" actionPath="/dashboard/bunk-planner" />
      </section>

      <section className="dashboard-page-grid-two">
        <DashboardMiniBarsCard {...data.dueLoad} />
        <DashboardDonutCard {...data.subjectSplit} />
      </section>

      <DashboardTablePanel {...data.priorityQueue} actionLabel="Open attendance" actionPath="/dashboard/attendance" />
    </>
  );
}

export default function AssignmentsSolverPage() {
  return (
    <DashboardWorkspaceLayout activeItem="Assignments Solver">
      <AssignmentsSolverPageContent />
    </DashboardWorkspaceLayout>
  );
}
