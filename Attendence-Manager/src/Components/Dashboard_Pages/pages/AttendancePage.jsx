import DashboardLowAttendanceCard from "../../Dashboard/components/DashboardLowAttendanceCard";
import DashboardMiniBarsCard from "../../Dashboard/components/DashboardMiniBarsCard";
import DashboardOverviewStatCard from "../../Dashboard/components/DashboardOverviewStatCard";
import DashboardSubjectGroupCard from "../../Dashboard/components/DashboardSubjectGroupCard";
import DashboardTrendCard from "../../Dashboard/components/DashboardTrendCard";
import { attendancePageData as data } from "../DashboardPagesData";
import DashboardListPanel from "../components/DashboardListPanel";
import DashboardPageHeader from "../components/DashboardPageHeader";
import DashboardTablePanel from "../components/DashboardTablePanel";
import DashboardWorkspaceLayout from "../components/DashboardWorkspaceLayout";

export default function AttendancePage() {
  return (
    <DashboardWorkspaceLayout activeItem="Attendance">
      <DashboardPageHeader {...data.header} />

      <section className="dashboard-page-stats-grid">
        {data.stats.map((item) => (
          <DashboardOverviewStatCard key={item.title} {...item} />
        ))}
      </section>

      <section className="dashboard-page-grid-wide">
        <DashboardTrendCard {...data.trend} />
        <DashboardListPanel {...data.signals} actionLabel="Open alert center" actionPath="/dashboard/alerts" />
      </section>

      <section className="dashboard-page-grid-two">
        <DashboardSubjectGroupCard {...data.groups} />
        <DashboardLowAttendanceCard {...data.lowSubjects} actionLabel="Open subject watchlist" actionPath="/dashboard/subjects" />
      </section>

      <section className="dashboard-page-grid-two">
        <DashboardTablePanel {...data.recoveryTable} actionLabel="Open subject detail" actionPath="/dashboard/subjects" />
        <DashboardMiniBarsCard {...data.compliance} />
      </section>
    </DashboardWorkspaceLayout>
  );
}
