function pluralize(value, word) {
  return `${value} ${word}${value === 1 ? "" : "s"}`;
}

const MODES = [
  { id: "single", label: "Skip one class" },
  { id: "multiple", label: "Skip multiple classes" },
  { id: "day", label: "Skip full day" },
];

export default function BunkPlannerScenarioPanel({
  mode,
  onModeChange,
  threshold,
  todayLabel,
  classOptions,
  dayOptions,
  selectedClassIds,
  selectedDayId,
  onToggleClass,
  onSelectDay,
  onPickRecommended,
  onSelectAllSafe,
  onResetSelection,
}) {
  return (
    <article className="dashboard-page-panel bunk-planner-scenario-panel">
      <div className="dashboard-page-panel-head bunk-planner-panel-head">
        <div>
          <h2>Scenario builder</h2>
          <p>Plan one class, multiple classes, or a full day before you decide to bunk.</p>
        </div>

        <span className="bunk-planner-threshold-pill">{threshold}% minimum</span>
      </div>

      <div className="bunk-planner-mode-switch" role="tablist" aria-label="Bunk planner mode">
        {MODES.map((item) => (
          <button
            key={item.id}
            type="button"
            className={item.id === mode ? "is-active" : ""}
            onClick={() => onModeChange(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {mode === "day" ? (
        <>
          <div className="bunk-planner-inline-actions">
            <strong>Full-day windows</strong>
            <button type="button" className="bunk-planner-inline-button" onClick={onPickRecommended}>
              Pick best day
            </button>
          </div>

          <div className="bunk-planner-day-options">
            {dayOptions.length ? (
              dayOptions.map((day) => (
                <button
                  key={day.id}
                  type="button"
                  className={[
                    "bunk-planner-day-option",
                    `tone-${day.tone}`,
                    day.id === selectedDayId ? "is-selected" : "",
                  ].join(" ")}
                  onClick={() => onSelectDay(day.id)}
                >
                  <div className="bunk-planner-day-option-head">
                    <strong>{day.day}</strong>
                    <span>{day.riskLabel}</span>
                  </div>
                  <div className="bunk-planner-day-option-metrics">
                    <div>
                      <small>Classes</small>
                      <strong>{pluralize(day.classes, "class")}</strong>
                    </div>
                    <div>
                      <small>After skip</small>
                      <strong>{day.afterOverallLabel}</strong>
                    </div>
                  </div>
                </button>
              ))
            ) : (
              <div className="bunk-planner-empty-block">No full-day windows are available from the live data yet.</div>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="bunk-planner-inline-actions">
            <strong>{todayLabel} timetable</strong>
            <div className="bunk-planner-inline-actions-row">
              {mode === "multiple" ? (
                <button type="button" className="bunk-planner-inline-button" onClick={onSelectAllSafe}>
                  Select safe classes
                </button>
              ) : (
                <button type="button" className="bunk-planner-inline-button" onClick={onPickRecommended}>
                  Pick safest class
                </button>
              )}
              <button type="button" className="bunk-planner-inline-button is-muted" onClick={onResetSelection}>
                Reset
              </button>
            </div>
          </div>

          <div className="bunk-planner-class-options">
            {classOptions.length ? (
              classOptions.map((item) => {
                const isSelected = selectedClassIds.includes(item.id);

                return (
                  <button
                    key={item.id}
                    type="button"
                    className={[
                      "bunk-planner-class-option",
                      `tone-${item.tone}`,
                      isSelected ? "is-selected" : "",
                    ].join(" ")}
                    onClick={() => onToggleClass(item.id)}
                  >
                    <div className="bunk-planner-class-option-head">
                      <div>
                        <strong>{item.subject}</strong>
                        <span>{item.family}</span>
                      </div>
                      <span className={item.action === "must_attend" ? "badge-danger" : "badge-safe"}>
                        {item.action === "must_attend" ? "Must attend" : "Safe"}
                      </span>
                    </div>

                    <div className="bunk-planner-class-option-meta">
                      <span>{item.time}</span>
                      <span>
                        {item.currentPercentageLabel} → {item.afterSkipPercentageLabel}
                      </span>
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="bunk-planner-empty-block">No class timetable is available to simulate right now.</div>
            )}
          </div>
        </>
      )}
    </article>
  );
}
