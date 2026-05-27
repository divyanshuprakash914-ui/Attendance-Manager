import { useEffect, useState } from "react";

import "./Dashboard.css";
import { getDashboardOverview } from "../../lib/api";
import {
  assignmentsSolver,
  attendanceTrend,
  bunkPlanner,
  dashboardHeader,
  leaveScenario,
  lowAttendanceSubjects,
  overviewStats,
  sidebarItems,
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
import DashboardTrendCard from "./components/DashboardTrendCard";

const dashboardSubjectColors = [
  "#7c4dff",
  "#2f80ed",
  "#1db954",
  "#ff9800",
  "#18b8b2",
  "#ff5c5c",
  "#7a86a7",
];

const dashboardLowSubjectColors = ["#ff5c5c", "#ff9800", "#3c4758", "#2f80ed", "#18b8b2"];

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
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        const data = await getDashboardOverview();
        setDashboardData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load dashboard.");
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (loading) {
    return <div className="dashboard-feedback-state">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="dashboard-feedback-state is-error">{error}</div>;
  }

  if (!dashboardData) {
    return <div className="dashboard-feedback-state">No dashboard data found.</div>;
  }

  const kpis = dashboardData.kpis || {};
  const user = dashboardData.user || {};
  const subjects = dashboardData.subjects || [];
  const groups = dashboardData.groups || [];
  const lowSubjects = dashboardData.low_subjects || [];
  const todayClasses = dashboardData.today_classes?.classes || [];
  const todayClassesDay = dashboardData.today_classes?.day || todaysClasses.subtitle;
  const bunkDays = dashboardData.bunk_planner?.days || [];
  const oneClassLeave = dashboardData.one_class_leave;

  const subjectChartData = subjects.map((subject) => ({
    name: subject.name,
    percentage: subject.percentage,
    attended: subject.attended,
    missed: subject.total - subject.attended,
  }));

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

  const overallPercentage = Number.parseFloat(
    String(kpis.overall_percentage ?? overviewStats[0].progress ?? 0),
  );
  const normalizedOverallPercentage = Number.isFinite(overallPercentage)
    ? overallPercentage
    : overviewStats[0].progress;
  const rawOverallPercentage = kpis.overall_percentage ?? normalizedOverallPercentage;
  const overallPercentageLabel = String(rawOverallPercentage).includes("%")
    ? String(rawOverallPercentage)
    : `${rawOverallPercentage}%`;

  const resolvedName = user.name || "Vani";
  const resolvedRole = user.role || "Student";
  const attendanceThreshold = kpis.threshold ?? 77;

  const liveHeader = {
    ...dashboardHeader,
    greeting: `Good morning, ${resolvedName}! 👋`,
    dateLabel: getCurrentDateLabel(),
  };

  const liveOverviewStats = [
    {
      ...overviewStats[0],
      value: overallPercentageLabel,
      subtitle: `${kpis.attended ?? overviewStats[1].value} / ${kpis.total ?? overviewStats[2].value} Lectures`,
      progress: normalizedOverallPercentage,
    },
    {
      ...overviewStats[1],
      value: `${kpis.attended ?? overviewStats[1].value}`,
      subtitle: "Total Lectures",
    },
    {
      ...overviewStats[2],
      value: `${kpis.total ?? overviewStats[2].value}`,
      subtitle: "Total Lectures",
    },
    {
      ...overviewStats[3],
      value: `${kpis.classes_needed ?? overviewStats[3].value}`,
      subtitle: `To reach ${attendanceThreshold}%`,
    },
    {
      ...overviewStats[4],
      value: `${kpis.bunks_allowed ?? overviewStats[4].value}`,
      subtitle: "More classes",
    },
  ];

  const liveSubjectGroups = {
    title: subjectGroupAttendance.title,
    bars: groupChartData.length
      ? groupChartData.map((group, index) => ({
          label: group.name,
          value: toNumber(group.percentage),
          color: dashboardSubjectColors[index % dashboardSubjectColors.length],
        }))
      : subjectGroupAttendance.bars,
  };

  const liveLowAttendance = {
    title: lowAttendanceSubjects.title,
    subtitle: `Below ${attendanceThreshold}%`,
    actionLabel: "Go to subjects",
    actionPath: "/dashboard/subjects",
    segments: lowSubjectChartData.length
      ? lowSubjectChartData.map((subject, index) => ({
          label: subject.name,
          value: toNumber(subject.value),
          color: dashboardLowSubjectColors[index % dashboardLowSubjectColors.length],
        }))
      : lowAttendanceSubjects.segments,
  };

  const liveTodayClassesItems = (
    todayClasses.length
      ? todayClasses.map((cls) => ({
          key: cls.key,
          subject: cls.subject,
          time: cls.time,
          action: cls.action,
        }))
      : todaysClasses.items.map((item) => ({
          key: item.subject,
          subject: item.subject,
          time: item.time,
          action: item.status === "Upcoming" ? "must_attend" : "safe",
        }))
  ).slice(0, 4);

  const liveTodayClasses = {
    title: todaysClasses.title,
    subtitle: formatTitleCase(todayClassesDay),
    items: liveTodayClassesItems,
    actionLabel: "Go to timetable",
    actionPath: "/dashboard/timetable",
  };

  const resolvedBunkDays = bunkChartData.length
    ? bunkChartData.map((day) => ({
        day: day.day,
        classes: day.classes,
        percentage: toNumber(day.percentage),
        risk: day.risk || "low",
      }))
    : bunkPlanner.rows.map((row) => ({
        day: row.day,
        classes: row.classes,
        percentage: toNumber(row.absent),
        risk: row.highlight ? "low" : "medium",
      }));

  const bestBunkDay =
    dashboardData.bunk_planner?.best_day ||
    bunkPlanner.rows.find((row) => row.highlight)?.day ||
    "Friday";

  const liveBunkPlannerDays = resolvedBunkDays
    .slice()
    .sort((a, b) => {
      if (a.day === bestBunkDay && b.day !== bestBunkDay) {
        return -1;
      }

      if (b.day === bestBunkDay && a.day !== bestBunkDay) {
        return 1;
      }

      if (a.classes !== b.classes) {
        return a.classes - b.classes;
      }

      return b.percentage - a.percentage;
    })
    .slice(0, 4);

  const liveBunkPlanner = {
    title: bunkPlanner.title,
    subtitle: bunkPlanner.subtitle,
    note: bunkPlanner.note,
    bestDay: bestBunkDay,
    days: liveBunkPlannerDays,
    actionLabel: "Go to bunk planner",
    actionPath: "/dashboard/bunk-planner",
  };

  const fallbackLeaveAll = leaveScenario.scenarios[0];
  const fallbackLeaveOne = leaveScenario.scenarios[1];
  const liveLeaveScenario = oneClassLeave
    ? {
        title: leaveScenario.title,
        day: formatTitleCase(oneClassLeave.day || "Today"),
        attendAll: {
          percentage: formatPercentage(oneClassLeave.attend_all?.percentage),
          ratio: `${oneClassLeave.attend_all?.attended ?? 0}/${oneClassLeave.attend_all?.total ?? 0}`,
        },
        leaveOne: {
          percentage: formatPercentage(oneClassLeave.leave_one?.percentage),
          ratio: `${oneClassLeave.leave_one?.attended ?? 0}/${oneClassLeave.leave_one?.total ?? 0}`,
        },
      }
    : {
        title: leaveScenario.title,
        day: formatTitleCase(leaveScenario.subtitle.replace("For Today (", "").replace(")", "")),
        attendAll: {
          percentage: fallbackLeaveAll.value,
          ratio: fallbackLeaveAll.ratio,
        },
        leaveOne: {
          percentage: fallbackLeaveOne.value,
          ratio: fallbackLeaveOne.ratio,
        },
      };

  liveLeaveScenario.actionLabel = "Go to leave tracker";
  liveLeaveScenario.actionPath = "/dashboard/leave-tracker";

  const liveSubjectTableRows = (
    subjectChartData.length
      ? subjectChartData.map((subject, index) => ({
          key: subjects[index].key || subject.name,
          subject: subject.name,
          attended: subject.attended,
          total: subjects[index].total,
          percentage: formatPercentage(subject.percentage),
          percentageValue: toNumber(subject.percentage),
          status:
            subjects[index].status ||
            ((subjects[index].classes_needed ?? 0) > 0 ? "danger" : "safe"),
          classesNeeded: subjects[index].classes_needed ?? 0,
          bunksAllowed: subjects[index].bunks_allowed ?? 0,
          color: dashboardSubjectColors[index % dashboardSubjectColors.length],
        }))
      : subjectWiseAttendance.rows.map((row) => ({
          key: row.subject,
          subject: row.subject,
          attended: row.attended,
          total: row.total,
          percentage: row.percentage,
          percentageValue: toNumber(row.percentage),
          status: row.needed > 0 ? "danger" : "safe",
          classesNeeded: row.needed,
          bunksAllowed: row.bunks,
          color: row.color,
        }))
  )
    .slice()
    .sort((a, b) => {
      const aPriority = a.status === "danger" ? 0 : 1;
      const bPriority = b.status === "danger" ? 0 : 1;

      if (aPriority !== bPriority) {
        return aPriority - bPriority;
      }

      return a.percentageValue - b.percentageValue;
    })
    .slice(0, 4);

  const liveSubjectTable = {
    title: subjectWiseAttendance.title,
    rows: liveSubjectTableRows,
    actionLabel: "Go to attendance",
    actionPath: "/dashboard/attendance",
  };

  const liveAssignmentsSolver = {
    ...assignmentsSolver,
    actionPath: "/dashboard/assignments-solver",
  };

  return (
    <div className="dashboard-page dashboard-student-page">
      <div className="dashboard-shell">
        <DashboardSidebar
          items={sidebarItems}
          activeItem="Overview"
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
              <DashboardTrendCard {...attendanceTrend} />
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
