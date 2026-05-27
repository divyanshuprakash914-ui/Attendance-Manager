import DashboardBunkPlannerCard from "../../Dashboard/components/DashboardBunkPlannerCard";
import DashboardLeaveScenarioCard from "../../Dashboard/components/DashboardLeaveScenarioCard";
import DashboardMiniBarsCard from "../../Dashboard/components/DashboardMiniBarsCard";
import DashboardOverviewStatCard from "../../Dashboard/components/DashboardOverviewStatCard";
import { bunkPlannerPageData as data } from "../DashboardPagesData";
import DashboardListPanel from "../components/DashboardListPanel";
import DashboardPageHeader from "../components/DashboardPageHeader";
import DashboardTablePanel from "../components/DashboardTablePanel";
import DashboardWorkspaceLayout from "../components/DashboardWorkspaceLayout";

export default function BunkPlannerPage() {
  return (
    <DashboardWorkspaceLayout activeItem="Bunk Planner">
      <DashboardPageHeader {...data.header} />

      <section className="dashboard-page-stats-grid">
        {data.stats.map((item) => (
          <DashboardOverviewStatCard key={item.title} {...item} />
        ))}
      </section>

      <section className="dashboard-page-grid-wide">
        <DashboardBunkPlannerCard {...data.planner} />
        <DashboardLeaveScenarioCard {...data.scenario} actionLabel="Compare leave scenarios" actionPath="/dashboard/leave-tracker" />
      </section>

      <section className="dashboard-page-grid-two">
        <DashboardMiniBarsCard {...data.leaveWindows} />
        <DashboardListPanel {...data.protectedClasses} actionLabel="Open attendance guardrails" actionPath="/dashboard/attendance" />
      </section>

      <DashboardTablePanel {...data.scenarioMatrix} actionLabel="Review leave tracker" actionPath="/dashboard/leave-tracker" />
    </DashboardWorkspaceLayout>
  );
}
