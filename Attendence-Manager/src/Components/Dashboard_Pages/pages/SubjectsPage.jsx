import DashboardDonutCard from "../../Dashboard/components/DashboardDonutCard";
import DashboardMiniBarsCard from "../../Dashboard/components/DashboardMiniBarsCard";
import DashboardOverviewStatCard from "../../Dashboard/components/DashboardOverviewStatCard";
import DashboardLowAttendanceCard from "../../Dashboard/components/DashboardLowAttendanceCard";
import DashboardSubjectGroupCard from "../../Dashboard/components/DashboardSubjectGroupCard";
import { subjectsPageData as data } from "../DashboardPagesData";
import DashboardListPanel from "../components/DashboardListPanel";
import SubjectsGuidanceCard from "../components/SubjectsGuidanceCard";
import DashboardTablePanel from "../components/DashboardTablePanel";
import DashboardWorkspaceLayout from "../components/DashboardWorkspaceLayout";
import "./SubjectsPage.css";

export default function SubjectsPage() {
  return (
    <DashboardWorkspaceLayout activeItem="Subjects" contentClassName="subjects-dashboard-content">
      <section className="subjects-hero">
        <div className="subjects-hero-copy">
          <h1>Subject health</h1>
          <p>Safe subjects, lab risk, and the next recovery move in one clean view.</p>
        </div>
      </section>

      <section className="dashboard-page-stats-grid">
        {data.stats.map((item) => (
          <DashboardOverviewStatCard key={item.title} {...item} />
        ))}
      </section>

      <section className="dashboard-page-grid-two">
        <DashboardSubjectGroupCard {...data.groups} />
        <DashboardLowAttendanceCard {...data.lowSubjects} />
      </section>

      <section className="dashboard-page-grid-wide">
        <DashboardTablePanel {...data.spotlightTable} />
        <div className="subjects-side-stack">
          <DashboardListPanel {...data.mentorQueue} actionLabel="Open mentoring queue" actionPath="/dashboard/alerts" />
          <SubjectsGuidanceCard {...data.guidance} />
        </div>
      </section>

      <section className="dashboard-page-grid-two subjects-support-grid">
        <DashboardMiniBarsCard {...data.weeklyLoad} className="subjects-load-card" />
        <DashboardDonutCard {...data.creditMix} className="subjects-credit-card" />
      </section>
    </DashboardWorkspaceLayout>
  );
}
