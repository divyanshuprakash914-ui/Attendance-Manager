import DashboardDonutCard from "../../Dashboard/components/DashboardDonutCard";
import DashboardLowAttendanceCard from "../../Dashboard/components/DashboardLowAttendanceCard";
import DashboardMiniBarsCard from "../../Dashboard/components/DashboardMiniBarsCard";
import DashboardOverviewStatCard from "../../Dashboard/components/DashboardOverviewStatCard";
import DashboardSubjectGroupCard from "../../Dashboard/components/DashboardSubjectGroupCard";
import DashboardListPanel from "../components/DashboardListPanel";
import DashboardPageHeader from "../components/DashboardPageHeader";
import DashboardTablePanel from "../components/DashboardTablePanel";
import DashboardWorkspaceLayout from "../components/DashboardWorkspaceLayout";
import useDashboardPageData from "../useDashboardPageData";

function AttendancePageContent() {
  const { attendancePage: data } = useDashboardPageData();

  return (
    <>
      <DashboardPageHeader
        icon="attendance"
        eyebrow="Attendance"
        title="Attendance overview"
        description="Track current score, recovery load, and the subjects that still need protection."
        chips={["Live data", `${data.stats[2]?.value || 0} at risk`]}
      />

      <section className="dashboard-page-stats-grid">
        {data.stats.map((item) => (
          <DashboardOverviewStatCard key={item.title} {...item} />
        ))}
      </section>

      <section className="dashboard-page-grid-wide">
        <DashboardMiniBarsCard {...data.recoveryLoad} />
        <DashboardListPanel {...data.signals} actionLabel="Open alert center" actionPath="/dashboard/alerts" />
      </section>

      <section className="dashboard-page-grid-two">
        <DashboardSubjectGroupCard {...data.groups} />
        <DashboardLowAttendanceCard {...data.lowSubjects} />
      </section>

      <section className="dashboard-page-grid-two">
        <DashboardTablePanel {...data.recoveryTable} actionLabel="Open subject detail" actionPath="/dashboard/subjects" />
        <DashboardDonutCard {...data.statusMix} />
      </section>
    </>
  );
}

export default function AttendancePage() {
  return (
    <DashboardWorkspaceLayout activeItem="Attendance">
      <AttendancePageContent />
    </DashboardWorkspaceLayout>
  );
}
