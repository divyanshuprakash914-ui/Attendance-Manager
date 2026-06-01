import { useMemo } from "react";

import { useBunkPlannerStore } from "./bunkPlannerStore";
import useDashboardWorkspace from "./useDashboardWorkspace";

function toNumber(value, fallback = 0) {
  const parsed = Number.parseFloat(String(value).replace("%", ""));
  return Number.isFinite(parsed) ? parsed : fallback;
}

function formatPercentage(value, maximumFractionDigits = 1) {
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

function pluralize(value, singular, plural = `${singular}s`) {
  return `${value} ${value === 1 ? singular : plural}`;
}

function buildSignature(mode, selectedClassIds, selectedDayId) {
  if (mode === "day") {
    return `day:${selectedDayId || "none"}`;
  }

  return `${mode}:${selectedClassIds.slice().sort().join("|")}`;
}

function projectAfterSkip(attended, total, skippedCount) {
  const nextTotal = total + skippedCount;

  if (!nextTotal) {
    return 0;
  }

  return (attended / nextTotal) * 100;
}

function computeMaxSafeBunks(attended, total, threshold) {
  const thresholdRatio = threshold / 100;

  if (!thresholdRatio) {
    return 0;
  }

  return Math.max(0, Math.floor(attended / thresholdRatio - total));
}

function computeRecoveryClasses(attended, total, threshold) {
  const thresholdRatio = threshold / 100;
  const numerator = thresholdRatio * total - attended;

  if (numerator <= 0 || thresholdRatio >= 1) {
    return 0;
  }

  return Math.max(0, Math.ceil(numerator / (1 - thresholdRatio)));
}

function inferSubjectFamily(name) {
  const label = String(name || "");

  if (label.toLowerCase().includes("lab")) {
    return "Lab stream";
  }

  if (label.toLowerCase().includes("yoga") || label.toLowerCase().includes("wellness")) {
    return "Wellness block";
  }

  if (label.toLowerCase().includes("stat") || label.toLowerCase().includes("math")) {
    return "Math stream";
  }

  return "Theory stream";
}

function getTone(percentage, threshold, maxBunks = 0) {
  if (percentage < threshold) {
    return "red";
  }

  if (percentage < threshold + 3 || maxBunks === 0) {
    return "amber";
  }

  return "green";
}

function getToneLabel(tone) {
  if (tone === "green") {
    return "Safe to skip";
  }

  if (tone === "amber") {
    return "Risky, but manageable";
  }

  return "Not safe";
}

function mapDayTone(risk, percentage, threshold) {
  if (risk === "safe") {
    return "green";
  }

  if (risk === "medium") {
    return "amber";
  }

  if (risk === "high") {
    return "red";
  }

  return getTone(percentage, threshold);
}

function getToneWeight(tone) {
  if (tone === "red") {
    return 3;
  }

  if (tone === "amber") {
    return 2;
  }

  return 1;
}

function findSubjectMatch(subjects, item) {
  return subjects.find((subject) => subject.key === item.key || subject.name === item.subject);
}

function buildScenarioState({ mode, selectedClassIds, selectedDayId, data }) {
  const threshold = data.threshold;

  if (mode === "day") {
    const selectedDay = data.dayOptions.find((day) => day.id === selectedDayId) || data.dayOptions[0];

    if (!selectedDay) {
      return {
        isEmpty: true,
        tone: "neutral",
        label: "Select a day",
        summary: "Choose a full day to preview how missing all lectures affects your attendance.",
        details: "The analyser will estimate your overall attendance and recovery load after that day is missed.",
        currentOverall: data.overall.percentageLabel,
        afterOverall: data.overall.percentageLabel,
        threshold: `${threshold}%`,
        selectedCountLabel: "0 classes",
        recoveryLabel: "0 classes",
        recoveryMessage: "No day selected yet.",
        affectedSubjects: [],
      };
    }

    const afterOverall = projectAfterSkip(data.overall.attended, data.overall.total, selectedDay.classes);
    const overallRecovery = computeRecoveryClasses(data.overall.attended, data.overall.total + selectedDay.classes, threshold);
    const tone = mapDayTone(selectedDay.risk, selectedDay.afterOverall, threshold);
    const label = tone === "green" ? "Safe to skip" : tone === "amber" ? "Risky, but manageable" : "Not safe";
    const summary =
      tone === "green"
        ? `${selectedDay.day} is the cleanest full-day leave window right now.`
        : tone === "amber"
          ? `${selectedDay.day} is possible, but you will need a tight recovery follow-up.`
          : `${selectedDay.day} pushes attendance too close to the limit for a safe full-day leave.`;
    const details =
      tone === "green"
        ? `If you miss the whole day, your overall attendance will still sit at ${formatPercentage(afterOverall)}.`
        : tone === "amber"
          ? `If you miss the whole day, your overall attendance becomes ${formatPercentage(afterOverall)} and the next classes must stay protected.`
          : `If you miss the whole day, your overall attendance drops to ${formatPercentage(afterOverall)} and the risky subjects should not absorb that hit.`;

    return {
      isEmpty: false,
      tone,
      label,
      summary,
      details,
      currentOverall: data.overall.percentageLabel,
      afterOverall: formatPercentage(afterOverall),
      threshold: `${threshold}%`,
      selectedCountLabel: pluralize(selectedDay.classes, "class", "classes"),
      recoveryLabel: pluralize(overallRecovery, "class", "classes"),
      recoveryMessage: overallRecovery
        ? `You need to attend the next ${pluralize(overallRecovery, "class", "classes")} after this leave day to recover safely.`
        : "No forced recovery block is needed if the rest of the week stays fully attended.",
      affectedSubjects: [],
      daySummary: `${selectedDay.day} · ${pluralize(selectedDay.classes, "lecture")} · ${selectedDay.riskLabel}`,
    };
  }

  const selectionSet = new Set(mode === "single" ? selectedClassIds.slice(0, 1) : selectedClassIds);
  const selectedClasses = data.classOptions.filter((item) => selectionSet.has(item.id));

  if (!selectedClasses.length) {
    return {
      isEmpty: true,
      tone: "neutral",
      label: "Select classes",
      summary: "Pick one class or multiple classes from today to see whether skipping them is safe.",
      details: "The analyser will compare your current attendance, projected attendance after skipping, and the recovery classes required.",
      currentOverall: data.overall.percentageLabel,
      afterOverall: data.overall.percentageLabel,
      threshold: `${threshold}%`,
      selectedCountLabel: "0 classes",
      recoveryLabel: "0 classes",
      recoveryMessage: "No classes selected yet.",
      affectedSubjects: [],
    };
  }

  const subjectCounts = selectedClasses.reduce((map, item) => {
    const current = map.get(item.subjectKey) || {
      id: item.subjectKey,
      name: item.subject,
      family: item.family,
      attended: item.subjectAttended,
      total: item.subjectTotal,
      currentPercentage: item.currentPercentage,
      skippedCount: 0,
      maxBunks: item.subjectMaxBunks,
      tone: item.subjectTone,
    };

    current.skippedCount += 1;
    map.set(item.subjectKey, current);
    return map;
  }, new Map());

  const affectedSubjects = Array.from(subjectCounts.values())
    .map((subject) => {
      const afterPercentage = projectAfterSkip(subject.attended, subject.total, subject.skippedCount);
      const recoveryNeeded = computeRecoveryClasses(subject.attended, subject.total + subject.skippedCount, threshold);
      const remainingBunks = computeMaxSafeBunks(subject.attended, subject.total + subject.skippedCount, threshold);
      const tone = getTone(afterPercentage, threshold, remainingBunks);

      return {
        ...subject,
        afterPercentage,
        currentPercentageLabel: formatPercentage(subject.currentPercentage),
        afterPercentageLabel: formatPercentage(afterPercentage),
        recoveryNeeded,
        remainingBunks,
        tone,
        toneLabel: getToneLabel(tone),
      };
    })
    .sort((left, right) => getToneWeight(right.tone) - getToneWeight(left.tone) || left.afterPercentage - right.afterPercentage);

  const skippedCount = selectedClasses.length;
  const overallAfter = projectAfterSkip(data.overall.attended, data.overall.total, skippedCount);
  const overallRecovery = computeRecoveryClasses(data.overall.attended, data.overall.total + skippedCount, threshold);
  const worstSubject = affectedSubjects[0];
  const tone =
    worstSubject?.afterPercentage < threshold || overallAfter < threshold
      ? "red"
      : worstSubject?.afterPercentage < threshold + 3 || overallAfter < threshold + 3 || skippedCount > 1
        ? "amber"
        : "green";
  const label = tone === "green" ? "Safe to skip" : tone === "amber" ? "Risky, but manageable" : "Not safe";
  const summary =
    tone === "green"
      ? "This selection stays comfortably above the live threshold."
      : tone === "amber"
        ? "This can work, but the next few classes should stay fully attended."
        : `${worstSubject?.name || "This selection"} falls below the live threshold after the skip.`;
  const details =
    tone === "green"
      ? `If you skip ${pluralize(skippedCount, "class", "classes")}, your overall attendance becomes ${formatPercentage(overallAfter)}.`
      : tone === "amber"
        ? `If you skip ${pluralize(skippedCount, "class", "classes")}, your overall attendance becomes ${formatPercentage(overallAfter)} and recovery should start immediately.`
        : `If you skip ${pluralize(skippedCount, "class", "classes")}, your overall attendance becomes ${formatPercentage(overallAfter)} and ${worstSubject?.name || "one subject"} turns unsafe.`;

  return {
    isEmpty: false,
    tone,
    label,
    summary,
    details,
    currentOverall: data.overall.percentageLabel,
    afterOverall: formatPercentage(overallAfter),
    threshold: `${threshold}%`,
    selectedCountLabel: pluralize(skippedCount, "class", "classes"),
    recoveryLabel: pluralize(overallRecovery, "class", "classes"),
    recoveryMessage: overallRecovery
      ? `You need to attend the next ${pluralize(overallRecovery, "class", "classes")} overall to rebuild your safety margin.`
      : "No forced recovery block is needed as long as upcoming classes remain attended.",
    affectedSubjects,
    daySummary: `${formatTitleCase(data.todayLabel)} · ${pluralize(skippedCount, "selected lecture")}`,
  };
}

export function getDefaultClassId(data) {
  const preferred = data.classOptions.find((item) => item.tone === "green") || data.classOptions[0];
  return preferred?.id || "";
}

export function getDefaultDayId(data) {
  const preferred = data.dayOptions.find((item) => item.tone === "green") || data.dayOptions[0];
  return preferred?.id || "";
}

export function createBunkPlanRecord({ mode, selectedClassIds, selectedDayId, scenario, data }) {
  const selectedClasses = data.classOptions.filter((item) => selectedClassIds.includes(item.id));
  const selectedDay = data.dayOptions.find((item) => item.id === selectedDayId) || null;
  const classCount = mode === "day" ? selectedDay?.classes || 0 : selectedClasses.length;
  const modeLabel =
    mode === "day" ? "Full-day bunk" : mode === "multi" ? "Multi-class bunk" : "Single-class bunk";
  const selectionLabel =
    mode === "day"
      ? selectedDay?.day || "Selected day"
      : selectedClasses.map((item) => `${item.subject} · ${item.time}`).join(" • ");

  return {
    id: `${buildSignature(mode, selectedClassIds, selectedDayId)}:${Date.now()}`,
    signature: buildSignature(mode, selectedClassIds, selectedDayId),
    mode,
    modeLabel,
    label:
      mode === "day"
        ? `${selectedDay?.day || "Day"} leave`
        : `${classCount} ${classCount === 1 ? "class" : "classes"} selected`,
    selectionLabel,
    dayLabel: mode === "day" ? selectedDay?.day || data.todayLabel : data.todayLabel,
    selectedCount: classCount,
    selectedCountLabel: scenario.selectedCountLabel,
    afterOverall: scenario.afterOverall,
    currentOverall: scenario.currentOverall,
    threshold: scenario.threshold,
    tone: scenario.tone,
    toneLabel: scenario.label,
    summary: scenario.summary,
    details: scenario.details,
    recoveryLabel: scenario.recoveryLabel,
    createdAt: new Date().toISOString(),
    classIds: selectedClasses.map((item) => item.id),
    classes: selectedClasses.map((item) => ({
      id: item.id,
      subjectKey: item.subjectKey,
      subject: item.subject,
      time: item.time,
      family: item.family,
      tone: item.tone,
    })),
    subjectEffects: scenario.affectedSubjects.map((subject) => ({
      id: subject.id,
      name: subject.name,
      skippedCount: subject.skippedCount || 0,
      tone: subject.tone,
      toneLabel: subject.toneLabel,
      currentPercentageLabel: subject.currentPercentageLabel,
      afterPercentageLabel: subject.afterPercentageLabel,
      recoveryNeeded: subject.recoveryNeeded,
      remainingBunks: subject.remainingBunks,
    })),
  };
}

export { buildScenarioState };

export default function useBunkPlannerData() {
  const { dashboardData } = useDashboardWorkspace();
  const { confirmed, buffers } = useBunkPlannerStore();

  return useMemo(() => {
    const kpis = dashboardData?.kpis || {};
    const threshold = toNumber(kpis.threshold, 75);
    const overallAttended = Number(kpis.attended) || 0;
    const overallTotal = Number(kpis.total) || 0;
    const todayPayload = dashboardData?.today_classes || {};
    const todayLabel = formatTitleCase(todayPayload.day || "Today");
    const subjectsRaw = dashboardData?.subjects || [];
    const todayRaw = todayPayload.classes || [];
    const bunkRaw = dashboardData?.bunk_planner?.days || [];

    const confirmedSubjectSkips = confirmed.reduce((map, plan) => {
      (plan.subjectEffects || []).forEach((subject) => {
        map.set(subject.id, (map.get(subject.id) || 0) + (Number(subject.skippedCount) || 0));
      });
      return map;
    }, new Map());

    const confirmedClassIds = new Set(confirmed.flatMap((plan) => plan.classIds || []));
    const confirmedOverallSkips = confirmed.reduce((sum, plan) => sum + (Number(plan.selectedCount) || 0), 0);
    const effectiveOverallTotal = overallTotal + confirmedOverallSkips;
    const overallPercentage = projectAfterSkip(overallAttended, overallTotal, confirmedOverallSkips);

    const subjectCards = subjectsRaw
      .map((subject, index) => {
        const attended = Number(subject.attended) || 0;
        const total = Number(subject.total) || 0;
        const confirmedSkips = confirmedSubjectSkips.get(subject.key || subject.name) || 0;
        const effectiveTotal = total + confirmedSkips;
        const percentage = projectAfterSkip(attended, total, confirmedSkips);
        const maxBunks = computeMaxSafeBunks(attended, effectiveTotal, threshold);
        const afterNextSkip = projectAfterSkip(attended, effectiveTotal, 1);
        const recoveryNeeded = computeRecoveryClasses(attended, effectiveTotal, threshold);
        const tone = getTone(percentage, threshold, maxBunks);

        return {
          id: subject.key || `${subject.name}-${index}`,
          key: subject.key || `${subject.name}-${index}`,
          name: subject.name,
          family: inferSubjectFamily(subject.name),
          attended,
          total: effectiveTotal,
          baseTotal: total,
          percentage,
          percentageLabel: formatPercentage(percentage),
          threshold,
          maxBunks,
          afterNextSkip,
          afterNextSkipLabel: formatPercentage(afterNextSkip),
          recoveryNeeded,
          confirmedSkips,
          tone,
          toneLabel: getToneLabel(tone),
          note:
            confirmedSkips > 0
              ? `${pluralize(confirmedSkips, "planned bunk")} already locked for this subject.`
              : tone === "green"
                ? "Reserve this only after risky subjects are protected."
                : tone === "amber"
                  ? "Close to the line. Use carefully."
                  : "Do not treat this as a bunk buffer right now.",
        };
      })
      .sort((left, right) => getToneWeight(right.tone) - getToneWeight(left.tone) || left.percentage - right.percentage);

    const classOptions = todayRaw.map((item, index) => {
      const subject = findSubjectMatch(subjectCards, item) || subjectCards.find((entry) => entry.name === item.subject);
      const subjectAttended = subject?.attended || 0;
      const subjectTotal = subject?.total || 0;
      const afterSkipPercentage = projectAfterSkip(subjectAttended, subjectTotal, 1);
      const tone = getTone(afterSkipPercentage, threshold, Math.max((subject?.maxBunks || 0) - 1, 0));

      return {
        id: `${item.key || item.subject}-${item.time}-${index}`,
        key: item.key || `${item.subject}-${index}`,
        subject: item.subject,
        subjectKey: subject?.key || item.key || `${item.subject}-${index}`,
        family: subject?.family || inferSubjectFamily(item.subject),
        time: item.time,
        action: item.action,
        currentPercentage: subject?.percentage || toNumber(item.percentage, 0),
        currentPercentageLabel: formatPercentage(subject?.percentage || toNumber(item.percentage, 0)),
        afterSkipPercentage,
        afterSkipPercentageLabel: formatPercentage(afterSkipPercentage),
        subjectAttended,
        subjectTotal,
        subjectMaxBunks: subject?.maxBunks || 0,
        subjectTone: subject?.tone || tone,
        tone: item.action === "must_attend" ? "red" : tone,
        isConfirmed: confirmedClassIds.has(`${item.key || item.subject}-${item.time}-${index}`),
      };
    });

    const dayOptions = bunkRaw
      .map((day, index) => {
        const classes = Number(day.classes) || 0;
        const afterOverall = projectAfterSkip(overallAttended, effectiveOverallTotal, classes);
        const tone = mapDayTone(day.risk, afterOverall, threshold);

        return {
          id: `${day.day || "day"}-${index}`,
          day: formatTitleCase(day.day),
          classes,
          afterOverall,
          afterOverallLabel: formatPercentage(afterOverall),
          tone,
          riskLabel: tone === "green" ? "Safe window" : tone === "amber" ? "Review carefully" : "Not safe",
          risk: day.risk || tone,
        };
      })
      .sort((left, right) => {
        if (getToneWeight(left.tone) !== getToneWeight(right.tone)) {
          return getToneWeight(left.tone) - getToneWeight(right.tone);
        }

        if (left.afterOverall !== right.afterOverall) {
          return right.afterOverall - left.afterOverall;
        }

        return left.classes - right.classes;
      });

    const protectedClasses = classOptions
      .filter((item) => item.action === "must_attend")
      .map((item) => ({
        id: item.id,
        label: item.subject,
        description: `${item.time} · skipping this drops the subject to ${item.afterSkipPercentageLabel}.`,
        tone: "red",
      }));

    const recoveryQueue = subjectCards
      .filter((subject) => subject.recoveryNeeded > 0 || subject.tone !== "green")
      .slice(0, 6)
      .map((subject) => ({
        id: subject.id,
        name: subject.name,
        tone: subject.tone,
        percentageLabel: subject.percentageLabel,
        recoveryLabel: subject.recoveryNeeded
          ? `Attend next ${pluralize(subject.recoveryNeeded, "class", "classes")}`
          : `Can bunk ${pluralize(subject.maxBunks, "class", "classes")}`,
        note: subject.note,
      }));

    const safeSubjects = subjectCards.filter((subject) => subject.tone === "green");
    const riskySubjects = subjectCards.filter((subject) => subject.tone !== "green");
    const totalSafeBunks = subjectCards.reduce((sum, subject) => sum + subject.maxBunks, 0);
    const bestDay = dayOptions[0];

    const summaryStats = [
      {
        icon: "attendance-card",
        title: "Overall attendance",
        value: formatPercentage(overallPercentage),
        subtitle: `${overallAttended} / ${effectiveOverallTotal} lectures tracked`,
        accent: "purple",
        progress: overallPercentage,
      },
      {
        icon: "bunks",
        title: "Max bunk reserve",
        value: String(totalSafeBunks),
        subtitle: "Total safe class buffers across subjects",
        accent: "green",
      },
      {
        icon: "needed",
        title: "Protected today",
        value: String(protectedClasses.length),
        subtitle: "Classes that should stay attended today",
        accent: "red",
      },
      {
        icon: "calendar",
        title: "Best day window",
        value: bestDay?.day || "—",
        subtitle: bestDay ? `${bestDay.afterOverallLabel} after a full-day leave` : "No leave window available",
        accent: "blue",
      },
    ];

    return {
      threshold,
      todayLabel,
      overall: {
        attended: overallAttended,
        total: effectiveOverallTotal,
        percentage: overallPercentage,
        percentageLabel: formatPercentage(overallPercentage),
        recoveryNeeded: computeRecoveryClasses(overallAttended, effectiveOverallTotal, threshold),
      },
      summaryStats,
      classOptions,
      dayOptions,
      subjectCards,
      protectedClasses,
      recoveryQueue,
      safeSubjects,
      riskySubjects,
      totalSafeBunks,
      bestDay,
      confirmedPlans: confirmed,
      bufferPlans: buffers,
    };
  }, [buffers, confirmed, dashboardData]);
}
