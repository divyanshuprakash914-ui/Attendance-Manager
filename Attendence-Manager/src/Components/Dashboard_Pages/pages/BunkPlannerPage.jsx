import { useMemo, useState } from "react";

import bunkPlannerPreviewVideo from "../../../assets/bfeac01c-116d-11ee-b589-efdc95805700.mp4";
import DashboardOverviewStatCard from "../../Dashboard/components/DashboardOverviewStatCard";
import BunkPlannerImpactPanel from "../components/BunkPlannerImpactPanel";
import BunkPlannerRecoveryPanel from "../components/BunkPlannerRecoveryPanel";
import BunkPlannerScenarioPanel from "../components/BunkPlannerScenarioPanel";
import BunkPlannerSelectionPanel from "../components/BunkPlannerSelectionPanel";
import BunkPlannerSubjectGrid from "../components/BunkPlannerSubjectGrid";
import DashboardPageHeader from "../components/DashboardPageHeader";
import DashboardWorkspaceLayout from "../components/DashboardWorkspaceLayout";
import useBunkPlannerData, {
  buildScenarioState,
  createBunkPlanRecord,
  getDefaultClassId,
  getDefaultDayId,
} from "../useBunkPlannerData";
import { saveBufferedBunkRecord, saveConfirmedBunkRecord } from "../bunkPlannerStore";
import "./BunkPlannerPage.css";

function BunkPlannerPageContent() {
  const data = useBunkPlannerData();
  const [mode, setMode] = useState("single");
  const [selectedClassIds, setSelectedClassIds] = useState([]);
  const [selectedDayId, setSelectedDayId] = useState("");
  const [feedback, setFeedback] = useState(null);
  const defaultClassId = getDefaultClassId(data);
  const defaultDayId = getDefaultDayId(data);
  const effectiveSelectedClassIds = useMemo(
    () => (selectedClassIds.length ? selectedClassIds : defaultClassId ? [defaultClassId] : []),
    [defaultClassId, selectedClassIds],
  );
  const effectiveSelectedDayId = selectedDayId || defaultDayId;
  const currentSelectionKey = useMemo(
    () => `${mode}:${effectiveSelectedDayId}:${effectiveSelectedClassIds.slice().sort().join("|")}`,
    [effectiveSelectedClassIds, effectiveSelectedDayId, mode],
  );

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
  const selectedClasses = useMemo(
    () => data.classOptions.filter((item) => effectiveSelectedClassIds.includes(item.id)),
    [data.classOptions, effectiveSelectedClassIds],
  );
  const selectedDay = useMemo(
    () => data.dayOptions.find((item) => item.id === effectiveSelectedDayId) || null,
    [data.dayOptions, effectiveSelectedDayId],
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

  function handleConfirmBunk() {
    if (scenario.isEmpty) {
      return;
    }

    const record = createBunkPlanRecord({
      mode,
      selectedClassIds: effectiveSelectedClassIds,
      selectedDayId: effectiveSelectedDayId,
      scenario,
      data,
    });

    saveConfirmedBunkRecord(record);
    setFeedback({
      selectionKey: currentSelectionKey,
      tone: "green",
      message: "Bunk confirmed. Leave Tracker has been updated with this planned leave.",
    });
  }

  function handleAddBuffer() {
    if (scenario.isEmpty) {
      return;
    }

    const record = createBunkPlanRecord({
      mode,
      selectedClassIds: effectiveSelectedClassIds,
      selectedDayId: effectiveSelectedDayId,
      scenario,
      data,
    });

    saveBufferedBunkRecord(record);
    setFeedback({
      selectionKey: currentSelectionKey,
      tone: "purple",
      message: "Scenario saved as a buffer. It will stay reusable without changing confirmed leave counts.",
    });
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
          <div className="bunk-planner-main-feature-grid">
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

            <article className="dashboard-page-panel bunk-planner-media-panel">
              <div className="dashboard-page-panel-head bunk-planner-panel-head">
                <div>
                  <h2>Planner preview</h2>
                  <p>See the decision workspace in motion while you compare bunk scenarios.</p>
                </div>
                <span className="bunk-planner-threshold-pill">Live demo</span>
              </div>

              <div className="bunk-planner-media-frame">
                <video
                  className="bunk-planner-media-video"
                  src={bunkPlannerPreviewVideo}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              </div>

              <div className="bunk-planner-media-notes">
                <div className="bunk-planner-media-note">
                  <span>Use before leave</span>
                  <strong>Preview impact before you confirm a bunk</strong>
                </div>
                <div className="bunk-planner-media-note">
                  <span>Best habit</span>
                  <strong>Save risky choices as buffers instead of confirming immediately</strong>
                </div>
              </div>
            </article>
          </div>

          <BunkPlannerSubjectGrid subjects={data.subjectCards} threshold={data.threshold} />
        </div>

        <div className="bunk-planner-side-column">
          <div className="bunk-planner-side-rail">
            <BunkPlannerImpactPanel scenario={scenario} />
            <BunkPlannerSelectionPanel
              mode={mode}
              scenario={scenario}
              selectedClasses={selectedClasses}
              selectedDay={selectedDay}
              confirmedCount={data.confirmedPlans.length}
              bufferCount={data.bufferPlans.length}
              feedback={feedback?.selectionKey === currentSelectionKey ? feedback : null}
              onConfirm={handleConfirmBunk}
              onAddBuffer={handleAddBuffer}
            />
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
