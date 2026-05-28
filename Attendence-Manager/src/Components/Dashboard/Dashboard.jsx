import { Link } from "react-router-dom";

import "./Dashboard.css";
import {
  assignmentsSolver,
  attendanceTrend,
  bunkPlanner,
  dashboardHeader,
  leaveScenario,
  lowAttendanceSubjects,
  overviewStats,
  subjectGroupAttendance,
  subjectWiseAttendance,
  todaysClasses,
} from "./DashboardData";
import DashboardAssignmentsCard from "./components/DashboardAssignmentsCard";
import DashboardBunkPlannerCard from "./components/DashboardBunkPlannerCard";
import DashboardLeaveScenarioCard from "./components/DashboardLeaveScenarioCard";
import DashboardLowAttendanceCard from "./components/DashboardLowAttendanceCard";
import DashboardOverviewHeader from "./components/DashboardOverviewHeader";
import DashboardOverviewStatCard from "./components/DashboardOverviewStatCard";
import DashboardSidebar from "./components/DashboardSidebar";
import DashboardSubjectGroupCard from "./components/DashboardSubjectGroupCard";
import DashboardSubjectTableCard from "./components/DashboardSubjectTableCard";
import DashboardTodayClassesCard from "./components/DashboardTodayClassesCard";
import DashboardTopbar from "./components/DashboardTopbar";
import DashboardTrendCard from "./components/DashboardTrendCard";
import useDashboardAccess from "./useDashboardAccess";

const onboardingSteps = [
  {
    title: "Complete your profile",
    body: "Add your full name, department, and timezone inside settings so the workspace is ready for daily use.",
  },
  {
    title: "Review notifications",
    body: "Choose which alerts and summaries should reach you before attendance workflows begin.",
  },
  {
    title: "Secure API access",
    body: "If you plan to integrate AttendEase, set the API access password before sharing credentials.",
  },
];

const fallbackPalette = ["#7c4dff", "#2f80ed", "#1db954", "#ff9800", "#18b8b2", "#ff5c5c", "#3c4758"];

function getCurrentDateLabel() {
  const currentDate = new Date();
  const datePart = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(currentDate);
  const weekday = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
  }).format(currentDate);

  return `${datePart} • ${weekday}`;
}

function toNumber(value, fallback = 0) {
  const parsed = Number.parseFloat(String(value).replace("%", ""));
  return Number.isFinite(parsed) ? parsed : fallback;
}

function formatPercentage(value, maximumFractionDigits = 2) {
  const parsed = toNumber(value, Number.NaN);

  if (!Number.isFinite(parsed)) {
    return typeof value === "string" && value.includes("%") ? value : `${value ?? 0}%`;
  }

  return `${parsed.toLocaleString("en-US", {
    minimumFractionDigits: parsed % 1 === 0 ? 0 : 1,
    maximumFractionDigits,
  })}%`;
}

function formatTitleCase(value) {
  if (!value) {
    return "";
  }

  return String(value)
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function buildSubjectColorLookup() {
  return [...subjectWiseAttendance.rows, ...lowAttendanceSubjects.segments].reduce((lookup, item, index) => {
    if (item.subject) {
      lookup[item.subject] = item.color || fallbackPalette[index % fallbackPalette.length];
    }

    if (item.label) {
      lookup[item.label] = item.color || fallbackPalette[index % fallbackPalette.length];
    }

    return lookup;
  }, {});
}

const subjectColorLookup = buildSubjectColorLookup();

function getSubjectColor(name, index) {
  return subjectColorLookup[name] || fallbackPalette[index % fallbackPalette.length];
}

function buildFallbackTodayItems() {
  return todaysClasses.items.map((item) => ({
    ...item,
    key: item.subject,
    action: item.status === "Upcoming" ? "must_attend" : "safe",
  }));
}

function buildFallbackSubjectRows() {
  return subjectWiseAttendance.rows.map((row) => ({
    key: row.subject,
    subject: row.subject,
    color: row.color,
    attended: row.attended,
    total: row.total,
    percentage: row.percentage,
    percentageValue: row.progress,
    status: row.needed > 0 ? "danger" : "safe",
    classesNeeded: row.needed,
    bunksAllowed: row.bunks,
  }));
}

export default function Dashboard() {
  const { dashboardData, user, profile, profileCompletion, profileUnlocked, navigationItems, loading, error } =
    useDashboardAccess();

  if (loading) {
    return <div className="dashboard-feedback-state">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="dashboard-feedback-state is-error">{error}</div>;
  }

  if (!dashboardData) {
    return <div className="dashboard-feedback-state">No dashboard data found.</div>;
  }

  const resolvedName = profile.name || user.name || "User";
  const firstName = resolvedName.split(" ")[0] || resolvedName;
  const resolvedRole = profile.role || user.role || "Workspace user";
  const resolvedEmail = profile.email || user.email || "Add your email in settings";
  const profileCompletionLabel = `${Math.max(0, Math.min(100, Math.round(profileCompletion)))}%`;

  if (!profileUnlocked) {
    const onboardingMessage = "Complete your profile to move forward.";
    const onboardingBadge = `Profile setup required · ${profileCompletionLabel}`;
    const helperCards = [
      {
        label: "Logged in as",
        value: resolvedRole,
        note: resolvedEmail,
      },
      {
        label: "Profile progress",
        value: profileCompletionLabel,
        note: "Reach at least 85% to unlock all pages.",
      },
    ];

    return (
      <div className="dashboard-page dashboard-onboarding-page">
        <div className="dashboard-shell">
          <DashboardSidebar
            items={navigationItems}
            activeItem="Dashboard"
            profileName={resolvedName}
            profileRole={resolvedRole}
          />

          <div className="dashboard-main">
            <DashboardTopbar profileName={resolvedName} />

            <main className="dashboard-content dashboard-onboarding-content">
              <section className="dashboard-onboarding-hero">
                <div className="dashboard-onboarding-copy">
                  <span className="dashboard-kicker">{onboardingBadge}</span>
                  <h1>Hello, {firstName}</h1>
                  <p>{onboardingMessage}</p>

                  <div className="dashboard-onboarding-actions">
                    <Link to="/dashboard/settings" className="dashboard-onboarding-primary">
                      Complete profile
                    </Link>
                    <span className="dashboard-onboarding-caption">
                      Finish your profile details there to unlock the rest of the workspace.
                    </span>
                  </div>
                </div>

                <div className="dashboard-onboarding-sidecards">
                  {helperCards.map((card) => (
                    <article key={card.label} className="dashboard-onboarding-sidecard">
                      <span>{card.label}</span>
                      <strong>{card.value}</strong>
                      <p>{card.note}</p>
                    </article>
                  ))}
                </div>
              </section>

              <section className="dashboard-onboarding-grid">
                <article className="dashboard-onboarding-card dashboard-onboarding-card-steps">
                  <div className="dashboard-onboarding-card-head">
                    <h2>What to complete first</h2>
                    <p>Keep the first session focused on setup, not reports.</p>
                  </div>

                  <div className="dashboard-onboarding-step-list">
                    {onboardingSteps.map((step, index) => (
                      <div key={step.title} className="dashboard-onboarding-step">
                        <span className="dashboard-onboarding-step-index">0{index + 1}</span>

                        <div className="dashboard-onboarding-step-copy">
                          <strong>{step.title}</strong>
                          <p>{step.body}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>

                <article className="dashboard-onboarding-card dashboard-onboarding-card-focus">
                  <div className="dashboard-onboarding-card-head">
                    <h2>Move forward from settings</h2>
                    <p>For now, only dashboard and settings stay visible until setup is complete.</p>
                  </div>

                  <div className="dashboard-onboarding-focus-panel">
                    <strong>Start with your profile</strong>
                    <p>Add the core information needed for the workspace and keep security preferences updated.</p>
                  </div>

                  <Link to="/dashboard/settings" className="dashboard-onboarding-secondary">
                    Complete profile in settings
                  </Link>
                </article>
              </section>
            </main>
          </div>
        </div>
      </div>
    );
  }

  const kpis = dashboardData.kpis || {};
  const subjects = dashboardData.subjects || [];
  const groups = dashboardData.groups || [];
  const lowSubjects = dashboardData.low_subjects || [];
  const todayClasses = dashboardData.today_classes?.classes || [];
  const todayClassesDay = dashboardData.today_classes?.day || todaysClasses.subtitle;
  const bunkDays = dashboardData.bunk_planner?.days || [];
  const oneClassLeave = dashboardData.one_class_leave || null;
  const assignmentsData = dashboardData.assignments_solver || null;
  const trendData = dashboardData.attendance_trend || dashboardData.trend || null;

  const groupChartData = groups.map((group) => ({
    name: group.name,
    percentage: group.percentage,
    attended: group.attended,
    total: group.total,
  }));

  const bunkChartData = bunkDays.map((day) => ({
    day: day.day,
    percentage: day.if_absent_percentage,
    classes: day.classes,
    risk: day.risk,
  }));

  const lowSubjectChartData = lowSubjects.slice(0, 5).map((subject) => ({
    name: subject.name,
    value: subject.percentage,
  }));

  const fallbackOverallValue = overviewStats[0]?.value ?? "0%";
  const overallPercentage = kpis.overall_percentage ?? fallbackOverallValue;
  const normalizedOverallPercentage = Math.max(0, Math.min(100, toNumber(overallPercentage, 0)));
  const overallPercentageLabel = formatPercentage(overallPercentage);
  const attended = kpis.attended ?? overviewStats[1]?.value ?? 0;
  const total = kpis.total ?? overviewStats[2]?.value ?? 0;
  const classesNeeded = kpis.classes_needed ?? overviewStats[3]?.value ?? 0;
  const threshold = kpis.threshold ?? 77;
  const bunksAllowed = kpis.bunks_allowed ?? overviewStats[4]?.value ?? 0;

  const liveHeader = {
    ...dashboardHeader,
    greeting: `Good morning, ${firstName}! 👋`,
    subtitle: dashboardHeader.subtitle,
    dateLabel: getCurrentDateLabel(),
  };

  const liveOverviewStats = [
    {
      ...overviewStats[0],
      value: overallPercentageLabel,
      subtitle: `${attended} / ${total} Lectures`,
      progress: normalizedOverallPercentage,
    },
    {
      ...overviewStats[1],
      value: String(attended),
      subtitle: "Total Lectures",
    },
    {
      ...overviewStats[2],
      value: String(total),
      subtitle: "Total Lectures",
    },
    {
      ...overviewStats[3],
      value: String(classesNeeded),
      subtitle: `To reach ${threshold}%`,
    },
    {
      ...overviewStats[4],
      value: String(bunksAllowed),
      subtitle: "More classes",
    },
  ];

  const liveTrend = {
    ...attendanceTrend,
    labels: trendData?.labels?.length ? trendData.labels : attendanceTrend.labels,
    values: trendData?.values?.length ? trendData.values.map((value) => toNumber(value, 0)) : attendanceTrend.values,
  };

  const liveSubjectGroups = {
    ...subjectGroupAttendance,
    bars: groupChartData.length
      ? groupChartData.map((group, index) => ({
          label: group.name,
          value: toNumber(group.percentage, 0),
          color: subjectGroupAttendance.bars[index]?.color || fallbackPalette[index % fallbackPalette.length],
        }))
      : subjectGroupAttendance.bars,
  };

  const liveLowAttendance = {
    ...lowAttendanceSubjects,
    segments: lowSubjectChartData.length
      ? lowSubjectChartData.map((subject, index) => ({
          label: subject.name,
          value: toNumber(subject.value, 0),
          color: getSubjectColor(subject.name, index),
        }))
      : lowAttendanceSubjects.segments,
    actionLabel: "Go to subjects",
    actionPath: "/dashboard/subjects",
  };

  const liveTodayClasses = {
    ...todaysClasses,
    subtitle: formatTitleCase(todayClassesDay || todaysClasses.subtitle),
    items: todayClasses.length ? todayClasses : buildFallbackTodayItems(),
    actionLabel: "Go to timetable",
    actionPath: "/dashboard/timetable",
  };

  const fallbackBunkDays = bunkPlanner.rows.map((row) => ({
    day: row.day,
    percentage: row.absent,
    classes: row.classes,
    risk: row.highlight ? "low" : "high",
  }));

  const bestBunkDay = dashboardData.bunk_planner?.best_day || bunkPlanner.rows.find((row) => row.highlight)?.day || "Friday";
  const orderedBunkDays = (bunkChartData.length ? bunkChartData : fallbackBunkDays)
    .slice()
    .sort((left, right) => {
      const leftBest = formatTitleCase(left.day) === formatTitleCase(bestBunkDay) ? -1 : 0;
      const rightBest = formatTitleCase(right.day) === formatTitleCase(bestBunkDay) ? -1 : 0;

      if (leftBest !== rightBest) {
        return leftBest - rightBest;
      }

      return toNumber(left.percentage, 0) - toNumber(right.percentage, 0);
    })
    .slice(0, 4)
    .map((day) => ({
      day: formatTitleCase(day.day),
      percentage: toNumber(day.percentage, 0).toFixed(2),
      classes: day.classes,
      risk: day.risk || "stable",
    }));

  const liveBunkPlanner = {
    title: bunkPlanner.title,
    subtitle: bunkPlanner.subtitle,
    note: bunkPlanner.note,
    days: orderedBunkDays,
    bestDay: formatTitleCase(bestBunkDay),
    actionLabel: "Go to bunk planner",
    actionPath: "/dashboard/bunk-planner",
  };

  const liveLeaveScenario = {
    title: leaveScenario.title,
    day: formatTitleCase(oneClassLeave?.day || todayClassesDay || leaveScenario.subtitle),
    attendAll: {
      percentage: formatPercentage(
        oneClassLeave?.attend_all?.percentage ?? leaveScenario.scenarios?.[0]?.value ?? "0%",
      ),
      ratio: oneClassLeave?.attend_all
        ? `${oneClassLeave.attend_all.attended}/${oneClassLeave.attend_all.total}`
        : leaveScenario.scenarios?.[0]?.ratio ?? "0/0",
    },
    leaveOne: {
      percentage: formatPercentage(
        oneClassLeave?.leave_one?.percentage ?? leaveScenario.scenarios?.[1]?.value ?? "0%",
      ),
      ratio: oneClassLeave?.leave_one
        ? `${oneClassLeave.leave_one.attended}/${oneClassLeave.leave_one.total}`
        : leaveScenario.scenarios?.[1]?.ratio ?? "0/0",
    },
    actionLabel: "Go to leave tracker",
    actionPath: "/dashboard/leave-tracker",
  };

  const sortedSubjects = subjects
    .slice()
    .sort((left, right) => {
      const leftDanger = left.status === "danger" || toNumber(left.percentage, 0) < Number(threshold) ? 1 : 0;
      const rightDanger = right.status === "danger" || toNumber(right.percentage, 0) < Number(threshold) ? 1 : 0;

      if (leftDanger !== rightDanger) {
        return rightDanger - leftDanger;
      }

      return toNumber(left.percentage, 0) - toNumber(right.percentage, 0);
    })
    .slice(0, 6);

  const liveSubjectTableRows = (sortedSubjects.length ? sortedSubjects : buildFallbackSubjectRows()).map((subject, index) => {
    if ("subject" in subject && "percentageValue" in subject) {
      return subject;
    }

    const percentageValue = Math.max(0, Math.min(100, toNumber(subject.percentage, 0)));
    const status = subject.status === "danger" || percentageValue < Number(threshold) ? "danger" : "safe";

    return {
      key: subject.key || subject.name,
      subject: subject.name,
      color: getSubjectColor(subject.name, index),
      attended: subject.attended,
      total: subject.total,
      percentage: formatPercentage(subject.percentage),
      percentageValue,
      status,
      classesNeeded: subject.classes_needed ?? 0,
      bunksAllowed: subject.bunks_allowed ?? 0,
    };
  });

  const liveSubjectTable = {
    title: subjectWiseAttendance.title,
    rows: liveSubjectTableRows,
    actionLabel: "Go to attendance",
    actionPath: "/dashboard/attendance",
  };

  const liveAssignmentsSolver = assignmentsData
    ? {
        title: assignmentsData.title || assignmentsSolver.title,
        badge: assignmentsData.badge || assignmentsSolver.badge,
        subtitle: assignmentsData.subtitle || assignmentsSolver.subtitle,
        completed: assignmentsData.completed ?? assignmentsSolver.completed,
        total: assignmentsData.total ?? assignmentsSolver.total,
        items: (assignmentsData.items || assignmentsSolver.items).map((item, index) => ({
          label: item.label,
          value: item.value || `${item.completed ?? 0} / ${item.total ?? 0}`,
          progress: item.progress ?? toNumber(item.percentage, 0),
          color: item.color || assignmentsSolver.items[index]?.color || fallbackPalette[index % fallbackPalette.length],
        })),
        actionLabel: "Go to assignments solver",
        actionPath: "/dashboard/assignments-solver",
      }
    : {
        ...assignmentsSolver,
        actionLabel: "Go to assignments solver",
        actionPath: "/dashboard/assignments-solver",
      };

  return (
    <div className="dashboard-page dashboard-student-page">
      <div className="dashboard-shell">
        <DashboardSidebar
          items={navigationItems}
          activeItem="Dashboard"
          profileName={resolvedName}
          profileRole={resolvedRole}
        />

        <div className="dashboard-main">
          <main className="dashboard-content dashboard-student-content">
            <DashboardOverviewHeader {...liveHeader} />

            <section className="dashboard-student-stats-grid">
              {liveOverviewStats.map((card) => (
                <DashboardOverviewStatCard key={card.title} {...card} />
              ))}
            </section>

            <section className="dashboard-student-top-grid">
              <DashboardTrendCard {...liveTrend} />
              <DashboardSubjectGroupCard {...liveSubjectGroups} />
              <DashboardLowAttendanceCard {...liveLowAttendance} />
            </section>

            <section className="dashboard-student-middle-grid">
              <DashboardTodayClassesCard {...liveTodayClasses} />
              <DashboardBunkPlannerCard {...liveBunkPlanner} />
              <DashboardLeaveScenarioCard {...liveLeaveScenario} />
            </section>

            <section className="dashboard-student-bottom-grid">
              <DashboardSubjectTableCard {...liveSubjectTable} />
              <DashboardAssignmentsCard {...liveAssignmentsSolver} />
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
