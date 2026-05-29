import { useMemo } from "react";

import { useBunkPlannerStore } from "./bunkPlannerStore";
import useDashboardWorkspace from "./useDashboardWorkspace";

const SUBJECT_COLORS = {
  "Applied Chem": "#7c4dff",
  "Applied Chem Lab 2": "#ff5c5c",
  English: "#2f80ed",
  "Prob. & Stat.": "#1db954",
  "P&S Lab 2": "#18b8b2",
  DSA: "#3c4758",
  "DSA Lab 2": "#3c4758",
  WAP: "#2f80ed",
  "WAP Lab 2": "#2f80ed",
  "India Constitution 2": "#ff9800",
  Yoga: "#18b8b2",
};

const GROUP_COLORS = {
  "Math + Math Lab": "#7c4dff",
  "WAP + WAP Lab": "#2f80ed",
  "Applied Chem + Lab": "#1db954",
  "DSA + DSA Lab": "#ff9800",
  Yoga: "#18b8b2",
};

const FALLBACK_COLORS = ["#7c4dff", "#2f80ed", "#1db954", "#ff9800", "#18b8b2", "#ff5c5c", "#3c4758"];

function toNumber(value, fallback = 0) {
  const parsed = Number.parseFloat(String(value).replace("%", ""));
  return Number.isFinite(parsed) ? parsed : fallback;
}

function formatPercentage(value, maximumFractionDigits = 2) {
  const parsed = toNumber(value, Number.NaN);

  if (!Number.isFinite(parsed)) {
    return `${value ?? 0}%`;
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

function shortDayLabel(value) {
  return formatTitleCase(value).slice(0, 3);
}

function shortenLabel(value) {
  const parts = String(value).split(" ");

  if (parts.length <= 2) {
    return value;
  }

  return `${parts[0]} ${parts[1]}`;
}

function average(values) {
  if (!values.length) {
    return 0;
  }

  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function getSubjectColor(name, index = 0) {
  return SUBJECT_COLORS[name] || FALLBACK_COLORS[index % FALLBACK_COLORS.length];
}

function getGroupColor(name, index = 0) {
  return GROUP_COLORS[name] || FALLBACK_COLORS[index % FALLBACK_COLORS.length];
}

function getRiskTone(subject, threshold) {
  const percentage = toNumber(subject.percentage, 0);

  if (percentage < threshold - 7) {
    return "red";
  }

  if (percentage < threshold) {
    return "amber";
  }

  return "green";
}

function getRecommendation(subject, threshold) {
  const percentage = toNumber(subject.percentage, 0);

  if (percentage < threshold - 7) {
    return {
      label: "Protect every upcoming class",
      caption: "Recovery has to come first",
    };
  }

  if (percentage < threshold) {
    return {
      label: "Hold full attendance",
      caption: "Stay present until it crosses the line",
    };
  }

  return {
    label: `Can bunk ${subject.bunks_allowed || 0}`,
    caption: "Use only as a reserve buffer",
  };
}

function buildStatusBadge(subject, threshold) {
  const percentage = toNumber(subject.percentage, 0);

  if (percentage < threshold) {
    return {
      tone: getRiskTone(subject, threshold),
      label: `Need ${subject.classes_needed || 0} classes`,
      caption: "Below threshold",
    };
  }

  return {
    tone: "green",
    label: `Can bunk ${subject.bunks_allowed || 0}`,
    caption: "Safe buffer",
  };
}

function buildAlertSegments(subjects, threshold) {
  const total = subjects.length || 1;
  const critical = subjects.filter((subject) => toNumber(subject.percentage, 0) < threshold - 7).length;
  const high = subjects.filter((subject) => {
    const percentage = toNumber(subject.percentage, 0);
    return percentage >= threshold - 7 && percentage < threshold - 3;
  }).length;
  const watch = Math.max(subjects.length - critical - high, 0);

  return [
    {
      label: "Critical",
      value: Math.round((critical / total) * 100),
      raw: critical,
      color: "#ff5c5c",
    },
    {
      label: "High",
      value: Math.round((high / total) * 100),
      raw: high,
      color: "#ff9800",
    },
    {
      label: "Watch",
      value: Math.round((watch / total) * 100),
      raw: watch,
      color: "#2f80ed",
    },
  ].filter((segment) => segment.raw > 0);
}

function buildSubjectShareSegments(subjects, threshold) {
  const total = subjects.length || 1;
  const atRisk = subjects.filter((subject) => toNumber(subject.percentage, 0) < threshold).length;
  const safeBuffer = subjects.filter(
    (subject) => toNumber(subject.percentage, 0) >= threshold && (subject.bunks_allowed || 0) > 0,
  ).length;
  const steady = Math.max(subjects.length - atRisk - safeBuffer, 0);

  return [
    {
      label: "At risk",
      value: Math.round((atRisk / total) * 100),
      raw: atRisk,
      color: "#ff5c5c",
    },
    {
      label: "Steady",
      value: Math.round((steady / total) * 100),
      raw: steady,
      color: "#2f80ed",
    },
    {
      label: "Safe buffer",
      value: Math.round((safeBuffer / total) * 100),
      raw: safeBuffer,
      color: "#1db954",
    },
  ].filter((segment) => segment.raw > 0);
}

function sortSubjectsByRisk(subjects) {
  return subjects
    .slice()
    .sort((left, right) => {
      const leftRisk = left.status === "danger" ? 1 : 0;
      const rightRisk = right.status === "danger" ? 1 : 0;

      if (leftRisk !== rightRisk) {
        return rightRisk - leftRisk;
      }

      return toNumber(left.percentage, 0) - toNumber(right.percentage, 0);
    });
}

export default function useDashboardPageData() {
  const { dashboardData } = useDashboardWorkspace();
  const { confirmed } = useBunkPlannerStore();

  return useMemo(() => {
    const kpis = dashboardData?.kpis || {};
    const subjects = dashboardData?.subjects || [];
    const groups = dashboardData?.groups || [];
    const lowSubjects = dashboardData?.low_subjects || [];
    const todayPayload = dashboardData?.today_classes || {};
    const todayClasses = todayPayload.classes || [];
    const todayLabel = formatTitleCase(todayPayload.day || "Today");
    const bunkPlanner = dashboardData?.bunk_planner || {};
    const bunkDays = (bunkPlanner.days || []).map((day) => ({
      ...day,
      percentage: toNumber(day.if_absent_percentage, 0),
      day: formatTitleCase(day.day),
    }));
    const bestDay = formatTitleCase(bunkPlanner.best_day || bunkDays[0]?.day || "");
    const oneClassLeave = dashboardData?.one_class_leave || {};
    const assignments = dashboardData?.assignments_solver || dashboardData?.assignments || {};

    const threshold = toNumber(kpis.threshold, 77);
    const overallPercentage = toNumber(kpis.overall_percentage, 0);
    const attended = kpis.attended || 0;
    const total = kpis.total || 0;

    const safeSubjects = subjects.filter((subject) => subject.status === "safe");
    const riskySubjects = sortSubjectsByRisk(subjects);
    const worstSubjects = riskySubjects.filter((subject) => toNumber(subject.percentage, 0) < threshold);
    const strongestSubjects = subjects
      .slice()
      .sort((left, right) => toNumber(right.percentage, 0) - toNumber(left.percentage, 0));

    const mustAttendClasses = todayClasses.filter((item) => item.action === "must_attend");
    const safeTodayClasses = todayClasses.filter((item) => item.action !== "must_attend");
    const sortedBunkDays = bunkDays
      .slice()
      .sort((left, right) => right.percentage - left.percentage || left.classes - right.classes);

    const lightestDay = sortedBunkDays[0];
    const heaviestDay = bunkDays.slice().sort((left, right) => right.classes - left.classes)[0];
    const averageSubjectScore = average(subjects.map((subject) => toNumber(subject.percentage, 0)));
    const totalGroupLectures = groups.reduce((sum, group) => sum + (group.total || 0), 0);

    const subjectStats = [
      {
        icon: "book-open",
        title: "Tracked Subjects",
        value: String(subjects.length),
        subtitle: `${safeSubjects.length} safe right now`,
        accent: "purple",
      },
      {
        icon: "attendance-card",
        title: "Average Subject Score",
        value: formatPercentage(averageSubjectScore),
        subtitle: "Across all live subjects",
        accent: "green",
        progress: averageSubjectScore,
      },
      {
        icon: "needed",
        title: "Recovery Needed",
        value: String(lowSubjects.length),
        subtitle: `Below ${threshold}%`,
        accent: "red",
      },
      {
        icon: "bunks",
        title: "Safe Bunk Subjects",
        value: String(safeSubjects.filter((subject) => (subject.bunks_allowed || 0) > 0).length),
        subtitle: "Current reserve subjects",
        accent: "blue",
        emphasized: true,
      },
    ];

    const subjectGroups = {
      title: "Attendance by subject stream",
      bars: groups.map((group, index) => ({
        label: group.name,
        value: toNumber(group.percentage, 0),
        color: getGroupColor(group.name, index),
      })),
    };

    const subjectLowPanel = {
      title: "Subjects that need attention",
      subtitle: lowSubjects.length ? `${lowSubjects.length} below ${threshold}%` : "No subjects below the live threshold",
      segments: (lowSubjects.length ? lowSubjects : strongestSubjects.slice(0, 1)).slice(0, 5).map((subject, index) => ({
        label: subject.name,
        value: toNumber(subject.percentage, 0),
        color: getSubjectColor(subject.name, index),
      })),
    };

    const subjectTable = {
      title: "Priority subjects",
      subtitle: "Live subject section for the current cycle",
      columns: ["Subject", "Current", "Status", "Next move"],
      rows: riskySubjects.map((subject, index) => {
        const badge = buildStatusBadge(subject, threshold);
        const recommendation = getRecommendation(subject, threshold);

        return {
          key: subject.key,
          highlight: subject.status === "danger" && index < 3,
          cells: [
            {
              kind: "subject",
              label: subject.name,
              caption: subject.status === "danger" ? "Needs recovery" : "Safe stream",
              dotColor: getSubjectColor(subject.name, index),
            },
            {
              label: formatPercentage(subject.percentage),
              caption: `${subject.attended} / ${subject.total} attended`,
            },
            {
              kind: "badge",
              label: badge.label,
              caption: badge.caption,
              tone: badge.tone,
            },
            {
              label: recommendation.label,
              caption: recommendation.caption,
            },
          ],
        };
      }),
    };

    const mentorQueue = {
      title: "Mentor checkpoints",
      subtitle: "Actions due before the next review",
      items: riskySubjects.slice(0, 4).map((subject) => ({
        label: subject.name,
        description:
          subject.status === "danger"
            ? `${subject.classes_needed || 0} more classes are needed to climb above ${threshold}%.`
            : `${subject.bunks_allowed || 0} reserve bunk${subject.bunks_allowed === 1 ? "" : "s"} available right now.`,
        value: subject.status === "danger" ? "Review" : "Stable",
        meta: formatPercentage(subject.percentage),
        tone: getRiskTone(subject, threshold),
      })),
    };

    const safeTheorySubjects = strongestSubjects
      .filter((subject) => toNumber(subject.percentage, 0) >= threshold)
      .slice(0, 2)
      .map((subject) => subject.name);

    const subjectGuidance = {
      title: "Weekly guidance",
      summary: safeTheorySubjects.length
        ? `Use ${safeTheorySubjects.join(" and ")} as buffers only after the weakest subjects are protected.`
        : "Protect the lowest subjects first before using any leave flexibility.",
      bullets: [
        {
          label: "Protect the lowest score first",
          text: worstSubjects[0]
            ? `${worstSubjects[0].name} is the first subject that should stay fully attended.`
            : "No subject is below the live threshold right now.",
        },
        {
          label: "Keep lab-heavy blocks intact",
          text: worstSubjects[1]
            ? `${worstSubjects[1].name} still needs protection before any optional absence is used.`
            : "Lab-heavy sessions are stable for now.",
        },
        {
          label: "Recheck the best leave day",
          text: bestDay
            ? `${bestDay} is still the cleanest current option if a leave window is necessary.`
            : "No leave recommendation is available yet.",
        },
      ],
      actionLabel: "Review with bunk planner",
      actionPath: "/dashboard/bunk-planner",
    };

    const subjectLoad = {
      title: "Lecture load by subject stream",
      subtitle: "Total lectures recorded",
      values: groups.map((group) => group.total || 0),
      labels: groups.map((group) => shortenLabel(group.name)),
      insights: [
        {
          label: "Peak stream",
          value: groups.length
            ? `${groups.slice().sort((left, right) => (right.total || 0) - (left.total || 0))[0].name} · ${
                groups.slice().sort((left, right) => (right.total || 0) - (left.total || 0))[0].total
              } lectures`
            : "No data",
        },
        {
          label: "Average",
          value: `${Math.round(average(groups.map((group) => group.total || 0)) * 10) / 10 || 0} per stream`,
        },
        {
          label: "Lightest",
          value: groups.length
            ? `${groups.slice().sort((left, right) => (left.total || 0) - (right.total || 0))[0].name} · ${
                groups.slice().sort((left, right) => (left.total || 0) - (right.total || 0))[0].total
              } lectures`
            : "No data",
        },
      ],
    };

    const creditMix = {
      title: "Credit mix",
      subtitle: "Share by subject family",
      centerLabel: "Lectures",
      centerValue: totalGroupLectures,
      legendFormatter: (segment) => `${segment.raw} lectures`,
      segments: groups.map((group, index) => ({
        label: group.name,
        value: totalGroupLectures ? Math.round(((group.total || 0) / totalGroupLectures) * 100) : 0,
        raw: group.total || 0,
        color: getGroupColor(group.name, index),
      })),
    };

    const attendanceStats = [
      {
        icon: "attendance-card",
        title: "Current Attendance",
        value: formatPercentage(overallPercentage),
        subtitle: `${attended} / ${total} verified`,
        accent: "purple",
        progress: overallPercentage,
      },
      {
        icon: "needed",
        title: "Gap To Threshold",
        value: formatPercentage(Math.max(threshold - overallPercentage, 0)),
        subtitle: `Target is ${threshold}%`,
        accent: "red",
      },
      {
        icon: "trend",
        title: "At-risk Subjects",
        value: String(lowSubjects.length),
        subtitle: "Need protected attendance",
        accent: "amber",
      },
      {
        icon: "bunks",
        title: "Safe Buffers",
        value: String(safeSubjects.filter((subject) => (subject.bunks_allowed || 0) > 0).length),
        subtitle: "Can absorb a leave",
        accent: "green",
      },
    ];

    const attendanceRecoveryLoad = {
      title: "Recovery load by subject",
      subtitle: "Classes needed to cross the line",
      values: (worstSubjects.length ? worstSubjects : subjects.slice(0, 1)).slice(0, 6).map((subject) => subject.classes_needed || 0),
      labels: (worstSubjects.length ? worstSubjects : subjects.slice(0, 1))
        .slice(0, 6)
        .map((subject) => shortenLabel(subject.name)),
      insights: [
        {
          label: "Worst subject",
          value: worstSubjects[0] ? `${worstSubjects[0].name} · ${worstSubjects[0].classes_needed} classes` : "No risk",
        },
        {
          label: "Average score",
          value: formatPercentage(averageSubjectScore),
        },
        {
          label: "Best buffer",
          value: strongestSubjects[0] ? `${strongestSubjects[0].name} · ${formatPercentage(strongestSubjects[0].percentage)}` : "No data",
        },
      ],
    };

    const attendanceSignals = {
      title: "Live signals",
      subtitle: "What needs attention first",
      items: [
        worstSubjects[0] && {
          label: worstSubjects[0].name,
          description: `${worstSubjects[0].classes_needed || 0} classes still needed to reach ${threshold}%.`,
          value: formatPercentage(worstSubjects[0].percentage),
          meta: "Recovery",
          tone: "red",
        },
        mustAttendClasses[0] && {
          label: `${mustAttendClasses.length} class${mustAttendClasses.length === 1 ? "" : "es"} marked must-attend`,
          description: "Today's schedule contains sessions that should stay protected.",
          value: todayLabel,
          meta: "Today",
          tone: "amber",
        },
        strongestSubjects[0] && {
          label: `${strongestSubjects[0].name} is stable`,
          description: "This subject is currently the healthiest reserve zone.",
          value: formatPercentage(strongestSubjects[0].percentage),
          meta: "Buffer",
          tone: "green",
        },
      ].filter(Boolean),
    };

    const attendanceRecoveryTable = {
      title: "Recovery queue",
      subtitle: "Subjects that need attendance protection now",
      columns: ["Subject", "Current", "Recovery", "Guardrail"],
      rows: riskySubjects.slice(0, 6).map((subject, index) => ({
        key: subject.key,
        highlight: index === 0 && subject.status === "danger",
        cells: [
          {
            kind: "subject",
            label: subject.name,
            caption: subject.status === "danger" ? "Below threshold" : "Safe buffer",
            dotColor: getSubjectColor(subject.name, index),
          },
          {
            label: formatPercentage(subject.percentage),
            caption: `${subject.attended} / ${subject.total} attended`,
          },
          {
            kind: "badge",
            label:
              subject.status === "danger"
                ? `Need ${subject.classes_needed || 0} classes`
                : `Can bunk ${subject.bunks_allowed || 0}`,
            caption: subject.status === "danger" ? "Recovery needed" : "Healthy",
            tone: subject.status === "danger" ? getRiskTone(subject, threshold) : "green",
          },
          {
            label: getRecommendation(subject, threshold).label,
            caption: getRecommendation(subject, threshold).caption,
          },
        ],
      })),
    };

    const attendanceStatusMix = {
      title: "Subject status mix",
      subtitle: "How the current subject set is distributed",
      centerLabel: "Subjects",
      centerValue: subjects.length,
      legendFormatter: (segment) => `${segment.raw} subjects`,
      segments: buildSubjectShareSegments(subjects, threshold),
    };

    const timetableStats = [
      {
        icon: "classes",
        title: "Classes Today",
        value: String(todayClasses.length),
        subtitle: `${todayLabel} schedule`,
        accent: "purple",
      },
      {
        icon: "needed",
        title: "Must Attend",
        value: String(mustAttendClasses.length),
        subtitle: "Protected sessions",
        accent: "red",
      },
      {
        icon: "check",
        title: "Safe Sessions",
        value: String(safeTodayClasses.length),
        subtitle: "Above live threshold",
        accent: "green",
      },
      {
        icon: "calendar",
        title: "Best Leave Day",
        value: bestDay || "—",
        subtitle: lightestDay ? `${lightestDay.classes} class${lightestDay.classes === 1 ? "" : "es"}` : "No data",
        accent: "blue",
      },
    ];

    const timetableTodayClasses = {
      title: "Today's classes",
      subtitle: todayLabel,
      items: todayClasses,
      actionLabel: "Go to attendance",
      actionPath: "/dashboard/attendance",
    };

    const timetableWindows = {
      title: "Best windows right now",
      subtitle: "Live leave and attendance view",
      items: sortedBunkDays.slice(0, 3).map((day) => ({
        label: `${day.day} window`,
        description: `If absent, overall attendance stays at ${formatPercentage(day.percentage)} after ${day.classes} class${
          day.classes === 1 ? "" : "es"
        }.`,
        value: day.risk === "safe" ? "Safe" : day.risk === "medium" ? "Review" : "Risk",
        meta: `${day.classes} class${day.classes === 1 ? "" : "es"}`,
        tone: day.risk === "safe" ? "green" : day.risk === "medium" ? "amber" : "red",
      })),
    };

    const timetableLoad = {
      title: "Class load by leave day",
      subtitle: "Classes scheduled on each weekday",
      values: bunkDays.map((day) => day.classes || 0),
      labels: bunkDays.map((day) => shortDayLabel(day.day)),
      insights: [
        {
          label: "Lightest",
          value: lightestDay ? `${lightestDay.day} · ${lightestDay.classes} classes` : "No data",
        },
        {
          label: "Heaviest",
          value: heaviestDay ? `${heaviestDay.day} · ${heaviestDay.classes} classes` : "No data",
        },
        {
          label: "Best leave day",
          value: bestDay || "No data",
        },
      ],
    };

    const timetableDetailTable = {
      title: "Today's schedule detail",
      subtitle: "Live class order and attendance priority",
      columns: ["Time", "Subject", "Status", "Attendance"],
      rows: todayClasses.map((item, index) => ({
        key: `${item.key}-${item.time}`,
        highlight: item.action === "must_attend",
        cells: [
          item.time,
          {
            kind: "subject",
            label: item.subject,
            caption: item.action === "must_attend" ? "Protected today" : "Currently safe",
            dotColor: getSubjectColor(item.subject, index),
          },
          {
            kind: "badge",
            label: item.action === "must_attend" ? "Must attend" : "Safe",
            caption: `Live ${formatPercentage(item.percentage)}`,
            tone: item.action === "must_attend" ? "red" : "green",
          },
          formatPercentage(item.percentage),
        ],
      })),
    };

    const bunkPlannerStats = [
      {
        icon: "bunks",
        title: "Best Leave Day",
        value: bestDay || "—",
        subtitle: lightestDay ? `${lightestDay.classes} class${lightestDay.classes === 1 ? "" : "es"} scheduled` : "No data",
        accent: "green",
      },
      {
        icon: "attendance-card",
        title: "Best Residual Score",
        value: lightestDay ? formatPercentage(lightestDay.percentage) : "0%",
        subtitle: "If that day is missed",
        accent: "purple",
      },
      {
        icon: "needed",
        title: "Risky Days",
        value: String(bunkDays.filter((day) => day.risk === "high").length),
        subtitle: "Should stay protected",
        accent: "red",
      },
      {
        icon: "calendar",
        title: "Safer Windows",
        value: String(bunkDays.filter((day) => day.risk === "safe").length),
        subtitle: "Lower impact options",
        accent: "blue",
      },
    ];

    const liveBunkPlanner = {
      title: "Best day to take leave",
      subtitle: "Overview of the current impact by day",
      note: "Ordered by the live residual attendance after a missed day.",
      bestDay: bestDay || "No data",
      days: sortedBunkDays.slice(0, 4).map((day) => ({
        day: day.day,
        classes: day.classes,
        percentage: day.percentage.toFixed(2),
        risk: day.risk,
      })),
      actionLabel: "Go to leave tracker",
      actionPath: "/dashboard/leave-tracker",
    };

    const liveLeaveScenario = {
      title: "One-class leave",
      day: todayLabel,
      attendAll: {
        percentage: formatPercentage(oneClassLeave.attend_all?.percentage || overallPercentage),
        ratio: oneClassLeave.attend_all
          ? `${oneClassLeave.attend_all.attended}/${oneClassLeave.attend_all.total}`
          : `${attended}/${total}`,
      },
      leaveOne: {
        percentage: formatPercentage(oneClassLeave.leave_one?.percentage || overallPercentage),
        ratio: oneClassLeave.leave_one
          ? `${oneClassLeave.leave_one.attended}/${oneClassLeave.leave_one.total}`
          : `${attended}/${total}`,
      },
      actionLabel: "Compare leave scenarios",
      actionPath: "/dashboard/leave-tracker",
    };

    const bunkImpactLoad = {
      title: "Residual attendance by day",
      subtitle: "If one full day is missed",
      values: bunkDays.map((day) => Math.round(day.percentage)),
      labels: bunkDays.map((day) => shortDayLabel(day.day)),
      insights: [
        {
          label: "Best day",
          value: bestDay || "No data",
        },
        {
          label: "Highest risk",
          value:
            bunkDays.filter((day) => day.risk === "high").sort((left, right) => left.percentage - right.percentage)[0]?.day ||
            "No data",
        },
        {
          label: "Threshold",
          value: `${threshold}% target`,
        },
      ],
    };

    const bunkProtectedClasses = {
      title: "Protected subjects",
      subtitle: "Do not spend leave around these first",
      items: worstSubjects.slice(0, 3).map((subject) => ({
        label: subject.name,
        description: `${subject.classes_needed || 0} more classes are needed before this becomes flexible again.`,
        value: formatPercentage(subject.percentage),
        meta: subject.status === "danger" ? "Protected" : "Stable",
        tone: getRiskTone(subject, threshold),
      })),
    };

    const bunkScenarioMatrix = {
      title: "Scenario matrix",
      subtitle: "Fast comparison of the current leave options",
      columns: ["Day", "Classes", "If absent", "Risk"],
      rows: sortedBunkDays.map((day, index) => ({
        key: day.day,
        highlight: index === 0,
        cells: [
          day.day,
          String(day.classes),
          formatPercentage(day.percentage),
          {
            kind: "badge",
            label: formatTitleCase(day.risk),
            caption: index === 0 ? "Best current window" : "Review before skipping",
            tone: day.risk === "safe" ? "green" : day.risk === "medium" ? "amber" : "red",
          },
        ],
      })),
    };

    const leaveStats = [
      {
        icon: "leave",
        title: "Recommended Windows",
        value: String(bunkDays.filter((day) => day.risk === "safe").length),
        subtitle: "Currently above the target line",
        accent: "green",
      },
      {
        icon: "calendar",
        title: "Best Day",
        value: bestDay || "—",
        subtitle: "Lowest current impact",
        accent: "purple",
      },
      {
        icon: "attendance-card",
        title: "One-Class Drop",
        value: formatPercentage(
          Math.max(
            toNumber(oneClassLeave.attend_all?.percentage, overallPercentage) -
              toNumber(oneClassLeave.leave_one?.percentage, overallPercentage),
            0,
          ),
        ),
        subtitle: "Difference from attending all",
        accent: "amber",
      },
      {
        icon: "bell",
        title: "Protected Subjects",
        value: String(lowSubjects.length),
        subtitle: "Should not absorb leave yet",
        accent: "red",
      },
    ];

    const leaveSafetyMix = {
      title: "Leave safety mix",
      subtitle: "Share of current leave-day options",
      centerLabel: "Days",
      centerValue: bunkDays.length,
      legendFormatter: (segment) => `${segment.raw} days`,
      segments: [
        {
          label: "Safe",
          value: Math.round((bunkDays.filter((day) => day.risk === "safe").length / Math.max(bunkDays.length, 1)) * 100),
          raw: bunkDays.filter((day) => day.risk === "safe").length,
          color: "#1db954",
        },
        {
          label: "Review",
          value: Math.round((bunkDays.filter((day) => day.risk === "medium").length / Math.max(bunkDays.length, 1)) * 100),
          raw: bunkDays.filter((day) => day.risk === "medium").length,
          color: "#ff9800",
        },
        {
          label: "High risk",
          value: Math.round((bunkDays.filter((day) => day.risk === "high").length / Math.max(bunkDays.length, 1)) * 100),
          raw: bunkDays.filter((day) => day.risk === "high").length,
          color: "#ff5c5c",
        },
      ].filter((segment) => segment.raw > 0),
    };

    const leaveFlow = {
      title: "Classes affected by day",
      subtitle: "How many sessions each leave choice touches",
      values: bunkDays.map((day) => day.classes || 0),
      labels: bunkDays.map((day) => shortDayLabel(day.day)),
      insights: [
        { label: "Least classes", value: lightestDay ? `${lightestDay.day} · ${lightestDay.classes}` : "No data" },
        { label: "Most classes", value: heaviestDay ? `${heaviestDay.day} · ${heaviestDay.classes}` : "No data" },
        { label: "Today", value: `${todayClasses.length} classes` },
      ],
    };

    const leaveCalendar = {
      title: "Leave calendar",
      subtitle: confirmed.length
        ? "Confirmed bunks saved from the planner"
        : "Confirmed bunks from the planner will appear here once they are saved.",
      entries: confirmed
        .slice()
        .sort((left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime())
        .map((plan) => ({
          id: plan.id,
          day: plan.dayLabel,
          modeLabel: plan.modeLabel,
          countLabel: plan.selectedCountLabel,
          afterOverall: plan.afterOverall,
          tone: plan.tone,
          detail:
            plan.mode === "day"
              ? `${plan.selectedCountLabel} locked as a full-day leave`
              : plan.selectionLabel || plan.summary,
        })),
    };

    const leaveRequestTable = {
      title: "Live request matrix",
      subtitle: "Best current leave windows from the overview payload",
      columns: ["Day", "Classes", "If absent", "Decision"],
      rows: sortedBunkDays.map((day, index) => ({
        key: `${day.day}-request`,
        highlight: index === 0,
        cells: [
          day.day,
          `${day.classes} ${day.classes === 1 ? "class" : "classes"}`,
          formatPercentage(day.percentage),
          {
            kind: "badge",
            label: day.risk === "safe" ? "Recommended" : day.risk === "medium" ? "Review" : "Avoid",
            caption: index === 0 ? "Best live window" : "Needs protection review",
            tone: day.risk === "safe" ? "green" : day.risk === "medium" ? "amber" : "red",
          },
        ],
      })),
    };

    const leaveApprovals = {
      title: "Current safe windows",
      subtitle: "Leave slots least likely to damage attendance",
      items: sortedBunkDays.slice(0, 3).map((day) => ({
        label: day.day,
        description: `${day.classes} class${day.classes === 1 ? "" : "es"} that keep overall attendance at ${formatPercentage(
          day.percentage,
        )} if missed.`,
        value: day.risk === "safe" ? "Safe" : day.risk === "medium" ? "Review" : "Risk",
        meta: "Live planner",
        tone: day.risk === "safe" ? "green" : day.risk === "medium" ? "amber" : "red",
      })),
    };

    const leaveConflictNotes = {
      title: "Conflict notes",
      subtitle: "What still blocks a safe leave",
      items: [
        ...worstSubjects.slice(0, 2).map((subject) => ({
          label: subject.name,
          description: `${subject.classes_needed || 0} more classes are needed before this subject becomes flexible.`,
          value: formatPercentage(subject.percentage),
          meta: "Protected",
          tone: getRiskTone(subject, threshold),
        })),
        ...(mustAttendClasses.length
          ? [
              {
                label: `${mustAttendClasses.length} must-attend class${mustAttendClasses.length === 1 ? "" : "es"} today`,
                description: "Today's schedule still contains protected sessions that should not be skipped.",
                value: todayLabel,
                meta: "Today",
                tone: "amber",
              },
            ]
          : []),
      ],
    };

    const alertsStats = [
      {
        icon: "bell",
        title: "Active Alerts",
        value: String(lowSubjects.length),
        subtitle: "Subjects below the live threshold",
        accent: "purple",
      },
      {
        icon: "needed",
        title: "Critical",
        value: String(worstSubjects.filter((subject) => toNumber(subject.percentage, 0) < threshold - 7).length),
        subtitle: "Require immediate recovery",
        accent: "red",
      },
      {
        icon: "attendance-card",
        title: "Must Attend Today",
        value: String(mustAttendClasses.length),
        subtitle: "Protected classes on the current day",
        accent: "amber",
      },
      {
        icon: "check",
        title: "Stable Subjects",
        value: String(safeSubjects.length),
        subtitle: "Currently above threshold",
        accent: "green",
      },
    ];

    const alertsSeverityMix = {
      title: "Severity mix",
      subtitle: "Split of the current alert subjects",
      centerLabel: "Alerts",
      centerValue: lowSubjects.length,
      legendFormatter: (segment) => `${segment.raw} subjects`,
      segments: buildAlertSegments(lowSubjects, threshold),
    };

    const alertItems = [
      ...worstSubjects.slice(0, 3).map((subject) => ({
        label: subject.name,
        description: `${subject.classes_needed || 0} classes are needed to move back above ${threshold}%.`,
        value:
          toNumber(subject.percentage, 0) < threshold - 7
            ? "Critical"
            : toNumber(subject.percentage, 0) < threshold
              ? "High"
              : "Watch",
        meta: formatPercentage(subject.percentage),
        tone: getRiskTone(subject, threshold),
      })),
      ...(mustAttendClasses.length
        ? [
            {
              label: `${mustAttendClasses.length} must-attend class${mustAttendClasses.length === 1 ? "" : "es"} today`,
              description: "Live timetable still contains protected sessions.",
              value: todayLabel,
              meta: "Schedule",
              tone: "amber",
            },
          ]
        : []),
    ];

    const alertRecoveryLoad = {
      title: "Recovery classes needed",
      subtitle: "Lowest subjects in the current set",
      values: (worstSubjects.length ? worstSubjects : subjects.slice(0, 1)).slice(0, 6).map((subject) => subject.classes_needed || 0),
      labels: (worstSubjects.length ? worstSubjects : subjects.slice(0, 1))
        .slice(0, 6)
        .map((subject) => shortenLabel(subject.name)),
      insights: [
        {
          label: "Highest need",
          value: worstSubjects[0] ? `${worstSubjects[0].name} · ${worstSubjects[0].classes_needed}` : "No risk",
        },
        {
          label: "Threshold",
          value: `${threshold}%`,
        },
        {
          label: "Today",
          value: `${mustAttendClasses.length} must-attend`,
        },
      ],
    };

    const alertQueueTable = {
      title: "Response queue",
      subtitle: "What should be reviewed first",
      columns: ["Subject", "Current", "Owner", "Next move"],
      rows: worstSubjects.slice(0, 6).map((subject, index) => ({
        key: `${subject.key}-alert`,
        highlight: index === 0,
        cells: [
          {
            kind: "subject",
            label: subject.name,
            caption: "Live attendance signal",
            dotColor: getSubjectColor(subject.name, index),
          },
          formatPercentage(subject.percentage),
          {
            kind: "badge",
            label: subject.classes_needed > 8 ? "Faculty + mentor" : "Mentor",
            caption: subject.classes_needed > 8 ? "Immediate review" : "Monitor",
            tone: subject.classes_needed > 8 ? "red" : "amber",
          },
          {
            label: getRecommendation(subject, threshold).label,
            caption: getRecommendation(subject, threshold).caption,
          },
        ],
      })),
    };

    const alertPath = {
      title: "Current guardrails",
      subtitle: "Practical next steps from live data",
      items: [
        {
          label: `Protect ${bestDay || "the safest day"} only after recovery`,
          description: "A safe leave window matters only if the lowest subjects are already under control.",
          value: bestDay || "Review",
          meta: "Planner",
          tone: "green",
        },
        {
          label: `${safeSubjects.filter((subject) => (subject.bunks_allowed || 0) > 0).length} safe buffer subjects`,
          description: "Only these should be treated as flexible once the risky subjects are protected.",
          value: "Buffers",
          meta: "Current",
          tone: "blue",
        },
      ],
    };

    const reportsStats = [
      {
        icon: "report",
        title: "Tracked Subjects",
        value: String(subjects.length),
        subtitle: "Live courses in this cycle",
        accent: "purple",
      },
      {
        icon: "attendance-card",
        title: "Average Score",
        value: formatPercentage(averageSubjectScore),
        subtitle: "Across all current subjects",
        accent: "green",
        progress: averageSubjectScore,
      },
      {
        icon: "needed",
        title: "Risk Subjects",
        value: String(lowSubjects.length),
        subtitle: "Below live threshold",
        accent: "amber",
      },
      {
        icon: "bunks",
        title: "Safe Buffers",
        value: String(safeSubjects.filter((subject) => (subject.bunks_allowed || 0) > 0).length),
        subtitle: "Can absorb leave",
        accent: "blue",
      },
    ];

    const reportMix = {
      title: "Attendance split by group",
      subtitle: "Attended vs missed lectures",
      legend: [
        { label: "Attended", color: "#18b8b2" },
        { label: "Missed", color: "#3c4758" },
      ],
      categories: groups.map((group) => ({
        label: group.name,
        verified: group.attended || 0,
        pending: Math.max((group.total || 0) - (group.attended || 0), 0),
      })),
    };

    const reportDistribution = {
      title: "Subject status share",
      subtitle: "Live distribution across all subjects",
      centerLabel: "Subjects",
      centerValue: subjects.length,
      legendFormatter: (segment) => `${segment.raw} subjects`,
      segments: buildSubjectShareSegments(subjects, threshold),
    };

    const reportRecoveryLoad = {
      title: "Recovery classes needed",
      subtitle: "Lowest subjects first",
      values: (worstSubjects.length ? worstSubjects : subjects.slice(0, 1)).slice(0, 6).map((subject) => subject.classes_needed || 0),
      labels: (worstSubjects.length ? worstSubjects : subjects.slice(0, 1))
        .slice(0, 6)
        .map((subject) => shortenLabel(subject.name)),
      insights: [
        {
          label: "Lowest score",
          value: worstSubjects[0] ? `${worstSubjects[0].name} · ${formatPercentage(worstSubjects[0].percentage)}` : "No risk",
        },
        {
          label: "Best stream",
          value: strongestSubjects[0] ? `${strongestSubjects[0].name} · ${formatPercentage(strongestSubjects[0].percentage)}` : "No data",
        },
        {
          label: "Best leave day",
          value: bestDay || "No data",
        },
      ],
    };

    const reportSummary = {
      title: "Snapshot notes",
      subtitle: "Live insights from the current overview",
      items: [
        strongestSubjects[0] && {
          label: strongestSubjects[0].name,
          description: "Currently the healthiest subject in the live dataset.",
          value: formatPercentage(strongestSubjects[0].percentage),
          meta: "Strongest",
          tone: "green",
        },
        worstSubjects[0] && {
          label: worstSubjects[0].name,
          description: `${worstSubjects[0].classes_needed || 0} more classes are needed before it becomes stable.`,
          value: formatPercentage(worstSubjects[0].percentage),
          meta: "Weakest",
          tone: "red",
        },
        bestDay && {
          label: `${bestDay} remains the best leave day`,
          description: "Current leave simulation still makes this the least damaging option.",
          value: bestDay,
          meta: "Planner",
          tone: "blue",
        },
      ].filter(Boolean),
    };

    const reportTable = {
      title: "Current subject snapshot",
      subtitle: "Useful live rows for any export or manual review",
      columns: ["Subject", "Attendance", "Recovery", "Buffer"],
      rows: riskySubjects.map((subject, index) => ({
        key: `${subject.key}-report`,
        highlight: index === 0 && subject.status === "danger",
        cells: [
          {
            kind: "subject",
            label: subject.name,
            caption: subject.status === "danger" ? "Needs protection" : "Healthy",
            dotColor: getSubjectColor(subject.name, index),
          },
          formatPercentage(subject.percentage),
          subject.status === "danger" ? `Need ${subject.classes_needed || 0} classes` : "Recovered",
          subject.status === "danger" ? "No buffer yet" : `${subject.bunks_allowed || 0} bunks`,
        ],
      })),
    };

    const assignmentItems = assignments.items || assignments.subjects || [];
    const assignmentCompleted = assignments.completed || 0;
    const assignmentTotal = assignments.total || 0;
    const hasAssignments = assignmentTotal > 0 && assignmentItems.length > 0;

    const assignmentsStats = [
      {
        icon: "spark",
        title: "Open Tasks",
        value: String(Math.max(assignmentTotal - assignmentCompleted, 0)),
        subtitle: "From the live assignment feed",
        accent: "purple",
      },
      {
        icon: "check",
        title: "Completed",
        value: String(assignmentCompleted),
        subtitle: "Finished assignments",
        accent: "green",
        progress: assignmentTotal ? (assignmentCompleted / assignmentTotal) * 100 : 0,
      },
      {
        icon: "calendar",
        title: "Tracked Subjects",
        value: String(Array.isArray(assignments.subjects) ? assignments.subjects.length : assignmentItems.length),
        subtitle: "Subjects carrying assignment load",
        accent: "blue",
      },
      {
        icon: "trend",
        title: "Status",
        value: hasAssignments ? "Live" : "No feed",
        subtitle: hasAssignments ? "Assignments are connected" : "Backend has not returned assignment items yet",
        accent: hasAssignments ? "amber" : "red",
      },
    ];

    const assignmentsCard = hasAssignments
      ? {
          title: "Assignments Solver",
          badge: "Live",
          subtitle: "Current assignment feed",
          completed: assignmentCompleted,
          total: assignmentTotal,
          items: assignmentItems.map((item, index) => ({
            label: item.label || item.name || `Subject ${index + 1}`,
            value:
              item.value ||
              `${item.completed ?? item.done ?? 0} / ${item.total ?? item.count ?? item.assigned ?? assignmentTotal}`,
            progress:
              item.progress ??
              (item.total ? Math.round(((item.completed || 0) / item.total) * 100) : Math.round((item.value / assignmentTotal) * 100) || 0),
            color: item.color || getSubjectColor(item.label || item.name || "", index),
          })),
          actionLabel: "Stay in solver",
          actionPath: "/dashboard/assignments-solver",
        }
      : null;

    const assignmentFocusWindows = {
      title: "Best focus windows",
      subtitle: "Current low-conflict time from the live planner",
      items: sortedBunkDays.slice(0, 3).map((day) => ({
        label: `${day.day} focus window`,
        description: `${day.classes} class${day.classes === 1 ? "" : "es"} and overall still lands at ${formatPercentage(day.percentage)} if missed.`,
        value: day.risk === "safe" ? "Light" : day.risk === "medium" ? "Review" : "Busy",
        meta: "Study slot",
        tone: day.risk === "safe" ? "green" : day.risk === "medium" ? "amber" : "red",
      })),
    };

    const assignmentSupportLoad = {
      title: "Protected study pressure",
      subtitle: "Recovery classes still blocking free time",
      values: (worstSubjects.length ? worstSubjects : subjects.slice(0, 1)).slice(0, 6).map((subject) => subject.classes_needed || 0),
      labels: (worstSubjects.length ? worstSubjects : subjects.slice(0, 1))
        .slice(0, 6)
        .map((subject) => shortenLabel(subject.name)),
      insights: [
        {
          label: "Most protected",
          value: worstSubjects[0] ? `${worstSubjects[0].name} · ${worstSubjects[0].classes_needed}` : "No data",
        },
        {
          label: "Best study day",
          value: bestDay || "No data",
        },
        {
          label: "Today",
          value: `${mustAttendClasses.length} must-attend`,
        },
      ],
    };

    const assignmentPressureMix = {
      title: "Current pressure split",
      subtitle: "Share of risky vs stable subject load",
      centerLabel: "Subjects",
      centerValue: subjects.length,
      legendFormatter: (segment) => `${segment.raw} subjects`,
      segments: buildSubjectShareSegments(subjects, threshold),
    };

    const assignmentQueue = {
      title: "Live academic blockers",
      subtitle: "What still competes with assignment time",
      columns: ["Subject", "Current", "Constraint", "Next move"],
      rows: riskySubjects.slice(0, 6).map((subject, index) => ({
        key: `${subject.key}-assignment`,
        highlight: index === 0,
        cells: [
          {
            kind: "subject",
            label: subject.name,
            caption: "Academic pressure",
            dotColor: getSubjectColor(subject.name, index),
          },
          formatPercentage(subject.percentage),
          {
            kind: "badge",
            label: subject.status === "danger" ? `Need ${subject.classes_needed || 0} classes` : "Stable",
            caption: subject.status === "danger" ? "Recovery blocks free time" : "Less restrictive",
            tone: subject.status === "danger" ? getRiskTone(subject, threshold) : "green",
          },
          {
            label: getRecommendation(subject, threshold).label,
            caption: "Use this before scheduling assignment catch-up",
          },
        ],
      })),
    };

    return {
      subjectsPage: {
        stats: subjectStats,
        groups: subjectGroups,
        lowSubjects: subjectLowPanel,
        spotlightTable: subjectTable,
        mentorQueue,
        guidance: subjectGuidance,
        weeklyLoad: subjectLoad,
        creditMix,
      },
      attendancePage: {
        stats: attendanceStats,
        recoveryLoad: attendanceRecoveryLoad,
        signals: attendanceSignals,
        groups: subjectGroups,
        lowSubjects: {
          ...subjectLowPanel,
          subtitle: lowSubjects.length ? `${lowSubjects.length} live alerts below ${threshold}%` : "No low subjects right now",
          actionLabel: "Open subject health",
          actionPath: "/dashboard/subjects",
        },
        recoveryTable: attendanceRecoveryTable,
        statusMix: attendanceStatusMix,
      },
      timetablePage: {
        stats: timetableStats,
        todayClasses: timetableTodayClasses,
        nextWindows: timetableWindows,
        dayLoad: timetableLoad,
        detailTable: timetableDetailTable,
      },
      bunkPlannerPage: {
        stats: bunkPlannerStats,
        planner: liveBunkPlanner,
        scenario: liveLeaveScenario,
        leaveWindows: bunkImpactLoad,
        protectedClasses: bunkProtectedClasses,
        scenarioMatrix: bunkScenarioMatrix,
      },
      leaveTrackerPage: {
        stats: leaveStats,
        leaveCalendar,
        scenario: liveLeaveScenario,
        safetyMix: leaveSafetyMix,
        leaveFlow,
        requestTable: leaveRequestTable,
        upcomingApprovals: leaveApprovals,
        conflictNotes: leaveConflictNotes,
      },
      alertsPage: {
        stats: alertsStats,
        severityMix: alertsSeverityMix,
        liveAlerts: {
          title: "Live alerts",
          subtitle: "Signals generated from the current overview",
          items: alertItems,
        },
        alertVolume: alertRecoveryLoad,
        automationTable: alertQueueTable,
        escalationPath: alertPath,
      },
      reportsPage: {
        stats: reportsStats,
        reportMix,
        reportDistribution,
        exportHistory: reportRecoveryLoad,
        schedules: reportSummary,
        exportTable: reportTable,
      },
      assignmentsPage: {
        stats: assignmentsStats,
        hasAssignments,
        solverCard: assignmentsCard,
        suggestions: assignmentFocusWindows,
        dueLoad: assignmentSupportLoad,
        subjectSplit: assignmentPressureMix,
        priorityQueue: assignmentQueue,
      },
    };
  }, [confirmed, dashboardData]);
}
