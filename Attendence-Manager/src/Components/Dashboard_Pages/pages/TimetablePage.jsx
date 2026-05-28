import DashboardDonutCard from "../../Dashboard/components/DashboardDonutCard";
import DashboardMiniBarsCard from "../../Dashboard/components/DashboardMiniBarsCard";
import DashboardOverviewStatCard from "../../Dashboard/components/DashboardOverviewStatCard";
import DashboardTodayClassesCard from "../../Dashboard/components/DashboardTodayClassesCard";
import DashboardListPanel from "../components/DashboardListPanel";
import DashboardPageHeader from "../components/DashboardPageHeader";
import DashboardTablePanel from "../components/DashboardTablePanel";
import DashboardWorkspaceLayout from "../components/DashboardWorkspaceLayout";
import useDashboardPageData from "../useDashboardPageData";

function TimetablePageContent() {
  const { timetablePage: data } = useDashboardPageData();

  return (
    <>
      <DashboardPageHeader
        icon="calendar"
        eyebrow="Timetable"
        title="Today’s timetable"
        description="Use the live class order, attendance priority, and best leave windows from the current overview."
        chips={[`${data.stats[0]?.value || 0} classes today`, `${data.stats[1]?.value || 0} must attend`]}
      />

      <section className="dashboard-page-stats-grid">
        {data.stats.map((item) => (
          <DashboardOverviewStatCard key={item.title} {...item} />
        ))}
      </section>

      <section className="dashboard-page-grid-wide">
        <DashboardTodayClassesCard {...data.todayClasses} />
        <DashboardListPanel {...data.nextWindows} actionLabel="Open day planner" actionPath="/dashboard/bunk-planner" />
      </section>

      <section className="dashboard-page-grid-two">
        <DashboardMiniBarsCard {...data.dayLoad} />
        <DashboardDonutCard
          title="Today action split"
          subtitle="Must-attend vs safe classes"
          centerLabel="Classes"
          centerValue={data.stats[0]?.value || 0}
          legendFormatter={(segment) => `${segment.raw} classes`}
          segments={[
            {
              label: "Must attend",
              value: Number(data.stats[0]?.value) ? Math.round((Number(data.stats[1]?.value) / Number(data.stats[0]?.value)) * 100) : 0,
              raw: Number(data.stats[1]?.value) || 0,
              color: "#ff5c5c",
            },
            {
              label: "Safe",
              value:
                Number(data.stats[0]?.value) && Number(data.stats[2]?.value)
                  ? Math.round((Number(data.stats[2]?.value) / Number(data.stats[0]?.value)) * 100)
                  : 0,
              raw: Number(data.stats[2]?.value) || 0,
              color: "#1db954",
            },
          ].filter((segment) => segment.raw > 0)}
        />
      </section>

      <DashboardTablePanel {...data.detailTable} actionLabel="Open attendance" actionPath="/dashboard/attendance" />
    </>
  );
}

export default function TimetablePage() {
  return (
    <DashboardWorkspaceLayout activeItem="Timetable">
      <TimetablePageContent />
    </DashboardWorkspaceLayout>
  );
}
