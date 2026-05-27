import DashboardAssignmentsCard from "../../Dashboard/components/DashboardAssignmentsCard";
import DashboardDonutCard from "../../Dashboard/components/DashboardDonutCard";
import DashboardMiniBarsCard from "../../Dashboard/components/DashboardMiniBarsCard";
import DashboardOverviewStatCard from "../../Dashboard/components/DashboardOverviewStatCard";
import { assignmentsSolverPageData as data } from "../DashboardPagesData";
import DashboardListPanel from "../components/DashboardListPanel";
import DashboardPageHeader from "../components/DashboardPageHeader";
import DashboardTablePanel from "../components/DashboardTablePanel";
import DashboardWorkspaceLayout from "../components/DashboardWorkspaceLayout";

export default function AssignmentsSolverPage() {
  return (
    <DashboardWorkspaceLayout activeItem="Assignments Solver">
      <DashboardPageHeader {...data.header} />

      <section className="dashboard-page-stats-grid">
        {data.stats.map((item) => (
          <DashboardOverviewStatCard key={item.title} {...item} />
        ))}
      </section>

      <section className="dashboard-page-grid-wide">
        <DashboardAssignmentsCard {...data.solverCard} actionPath="/dashboard/assignments-solver" />
        <DashboardListPanel {...data.suggestions} actionLabel="Open planner signals" actionPath="/dashboard/bunk-planner" />
      </section>

      <section className="dashboard-page-grid-two">
        <DashboardMiniBarsCard {...data.dueLoad} />
        <DashboardDonutCard {...data.subjectSplit} />
      </section>

      <DashboardTablePanel {...data.priorityQueue} actionLabel="Open full solver" actionPath="/dashboard/assignments-solver" />
    </DashboardWorkspaceLayout>
  );
}
