function formatSelectedClasses(items) {
  if (!items.length) {
    return "No classes selected.";
  }

  if (items.length === 1) {
    return `${items[0].subject} · ${items[0].time}`;
  }

  const preview = items.slice(0, 2).map((item) => `${item.subject} · ${item.time}`).join(" • ");
  return items.length > 2 ? `${preview} • +${items.length - 2} more` : preview;
}

export default function BunkPlannerSelectionPanel({
  mode,
  scenario,
  selectedClasses,
  selectedDay,
  confirmedCount,
  bufferCount,
  feedback,
  onConfirm,
  onAddBuffer,
}) {
  const hasSelection = !scenario.isEmpty;

  return (
    <article className="dashboard-page-panel bunk-planner-selection-panel">
      <div className="dashboard-page-panel-head bunk-planner-panel-head">
        <div>
          <h2>Selected bunk action</h2>
          <p>Review the exact skip before saving it as a confirmed leave or a reusable buffer.</p>
        </div>

        <div className="bunk-planner-selection-totals">
          <span className="bunk-planner-selection-total">{confirmedCount} confirmed</span>
          <span className="bunk-planner-selection-total is-muted">{bufferCount} buffers</span>
        </div>
      </div>

      {hasSelection ? (
        <>
          <div className="bunk-planner-selection-hero">
            <div className="bunk-planner-selection-summary">
              <span>{mode === "day" ? "Selected day" : "Selected classes"}</span>
              <strong>{mode === "day" ? selectedDay?.day || "No day selected" : scenario.selectedCountLabel}</strong>
              <small>
                {mode === "day"
                  ? `${selectedDay?.classes || 0} classes will be treated as a confirmed leave block.`
                  : formatSelectedClasses(selectedClasses)}
              </small>
            </div>

            <div className={`bunk-planner-selection-final tone-${scenario.tone}`}>
              <span>Final attendance</span>
              <strong>{scenario.afterOverall}</strong>
              <small>{scenario.label}</small>
            </div>
          </div>

          {mode !== "day" && selectedClasses.length ? (
            <div className="bunk-planner-selection-class-list">
              {selectedClasses.map((item) => (
                <div key={item.id} className={`bunk-planner-selection-class tone-${item.tone}`}>
                  <strong>{item.subject}</strong>
                  <span>{item.time}</span>
                </div>
              ))}
            </div>
          ) : null}

          {feedback ? <div className={`bunk-planner-selection-feedback tone-${feedback.tone}`}>{feedback.message}</div> : null}

          <div className="bunk-planner-selection-actions">
            <button type="button" className="bunk-planner-selection-button is-primary" onClick={onConfirm}>
              Confirm bunk
            </button>
            <button type="button" className="bunk-planner-selection-button" onClick={onAddBuffer}>
              Add buffer
            </button>
          </div>
        </>
      ) : (
        <div className="bunk-planner-empty-block">Select a class or a day first to preview the bunk action you want to save.</div>
      )}
    </article>
  );
}
