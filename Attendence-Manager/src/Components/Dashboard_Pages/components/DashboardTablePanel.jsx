import { Link } from "react-router-dom";

function renderCellContent(cell) {
  if (cell && typeof cell === "object" && !Array.isArray(cell)) {
    if (cell.kind === "badge") {
      return (
        <div className="dashboard-table-panel-cell-stack">
          <span className={`dashboard-table-panel-badge tone-${cell.tone || "neutral"}`}>
            {cell.label}
          </span>
          {cell.caption ? <span className="dashboard-table-panel-cell-caption">{cell.caption}</span> : null}
        </div>
      );
    }

    if (cell.kind === "subject") {
      return (
        <div className="dashboard-table-panel-cell dashboard-table-panel-cell-subject">
          <span
            className="dashboard-table-panel-cell-swatch"
            style={{ backgroundColor: cell.dotColor || "#7c4dff" }}
            aria-hidden="true"
          />
          <div className="dashboard-table-panel-cell-stack">
            <strong className="dashboard-table-panel-cell-label">{cell.label}</strong>
            {cell.caption ? <span className="dashboard-table-panel-cell-caption">{cell.caption}</span> : null}
          </div>
        </div>
      );
    }

    return (
      <div className="dashboard-table-panel-cell-stack">
        <strong className="dashboard-table-panel-cell-label">{cell.label}</strong>
        {cell.caption ? <span className="dashboard-table-panel-cell-caption">{cell.caption}</span> : null}
      </div>
    );
  }

  return cell;
}

export default function DashboardTablePanel({
  title,
  subtitle,
  columns,
  rows,
  actionLabel,
  actionPath,
}) {
  return (
    <article className="dashboard-page-panel">
      <div className="dashboard-page-panel-head">
        <div>
          <h2>{title}</h2>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
      </div>

      <table className="dashboard-table-panel-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.key} className={row.highlight ? "is-highlight" : ""}>
              {row.cells.map((cell, index) => (
                <td key={`${row.key}-${index}`}>{renderCellContent(cell)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {actionLabel && actionPath ? (
        <Link to={actionPath} className="dashboard-page-link">
          {actionLabel}
          <span aria-hidden="true">→</span>
        </Link>
      ) : null}
    </article>
  );
}
