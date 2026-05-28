import { useMemo, useState } from "react";

import DashboardOverviewStatCard from "../../Dashboard/components/DashboardOverviewStatCard";
import BunkPlannerImpactPanel from "../components/BunkPlannerImpactPanel";
import BunkPlannerRecoveryPanel from "../components/BunkPlannerRecoveryPanel";
import BunkPlannerScenarioPanel from "../components/BunkPlannerScenarioPanel";
import BunkPlannerSubjectGrid from "../components/BunkPlannerSubjectGrid";
import DashboardPageHeader from "../components/DashboardPageHeader";
import DashboardWorkspaceLayout from "../components/DashboardWorkspaceLayout";
import useBunkPlannerData, {
  buildScenarioState,
  getDefaultClassId,
  getDefaultDayId,
} from "../useBunkPlannerData";
import "./BunkPlannerPage.css";

function BunkPlannerPageContent() {
  const data = useBunkPlannerData();
  const [mode, setMode] = useState("single");
  const [selectedClassIds, setSelectedClassIds] = useState([]);
  const [selectedDayId, setSelectedDayId] = useState("");
  const defaultClassId = getDefaultClassId(data);
  const defaultDayId = getDefaultDayId(data);
  const effectiveSelectedClassIds = useMemo(
    () => (selectedClassIds.length ? selectedClassIds : defaultClassId ? [defaultClassId] : []),
    [defaultClassId, selectedClassIds],
  );
  const effectiveSelectedDayId = selectedDayId || defaultDayId;

  const scenario = useMemo(
    () =>
      buildScenarioState({
        mode,
        selectedClassIds: effectiveSelectedClassIds,
        selectedDayId: effectiveSelectedDayId,
        data,
      }),
    [data, effectiveSelectedClassIds, effectiveSelectedDayId, mode],
  );

  function handleModeChange(nextMode) {
    setMode(nextMode);

    if (nextMode === "single") {
      if (!effectiveSelectedClassIds.length) {
        setSelectedClassIds(defaultClassId ? [defaultClassId] : []);
      } else {
        setSelectedClassIds([effectiveSelectedClassIds[0]]);
      }
    }

    if (nextMode === "day" && !effectiveSelectedDayId) {
      setSelectedDayId(defaultDayId || "");
    }
  }

  function handleToggleClass(classId) {
    if (mode === "single") {
      setSelectedClassIds([classId]);
      return;
    }

    setSelectedClassIds((current) => (current.includes(classId) ? current.filter((item) => item !== classId) : [...current, classId]));
  }

  function handlePickRecommended() {
    if (mode === "day") {
      setSelectedDayId(defaultDayId || "");
      return;
    }

    setSelectedClassIds(defaultClassId ? [defaultClassId] : []);
  }

  function handleSelectAllSafe() {
    const safeIds = data.classOptions.filter((item) => item.tone !== "red").map((item) => item.id);
    setSelectedClassIds(safeIds.length ? safeIds : data.classOptions.slice(0, 1).map((item) => item.id));
  }

  function handleResetSelection() {
    setSelectedClassIds(defaultClassId ? [defaultClassId] : []);
  }

  return (
    <>
      <DashboardPageHeader
        icon="trend"
        eyebrow="Bunk Planner"
        title="Plan a bunk before you take it"
        description="Simulate one class, multiple classes, or a full day using your live attendance, subject thresholds, and timetable pressure."
        chips={[`${data.threshold}% minimum`, "Live class analyser", "Subject-wise max bunk boxes"]}
      />

      <section className="dashboard-page-stats-grid">
        {data.summaryStats.map((item) => (
          <DashboardOverviewStatCard key={item.title} {...item} />
        ))}
      </section>

      <section className="bunk-planner-workspace-grid">
        <div className="bunk-planner-main-column">
          <BunkPlannerScenarioPanel
            mode={mode}
            onModeChange={handleModeChange}
            threshold={data.threshold}
            todayLabel={data.todayLabel}
            classOptions={data.classOptions}
            dayOptions={data.dayOptions}
            selectedClassIds={effectiveSelectedClassIds}
            selectedDayId={effectiveSelectedDayId}
            onToggleClass={handleToggleClass}
            onSelectDay={setSelectedDayId}
            onPickRecommended={handlePickRecommended}
            onSelectAllSafe={handleSelectAllSafe}
            onResetSelection={handleResetSelection}
          />
          <BunkPlannerSubjectGrid subjects={data.subjectCards} threshold={data.threshold} />
        </div>

        <div className="bunk-planner-side-column">
          <div className="bunk-planner-side-rail">
            <BunkPlannerImpactPanel scenario={scenario} />
            <BunkPlannerRecoveryPanel
              bestDay={data.bestDay}
              protectedClasses={data.protectedClasses}
              recoveryQueue={data.recoveryQueue}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default function BunkPlannerPage() {
  return (
    <DashboardWorkspaceLayout activeItem="Bunk Planner" contentClassName="bunk-planner-dashboard-content">
      <BunkPlannerPageContent />
    </DashboardWorkspaceLayout>
  );
}
