import DashboardIcon from "../../Dashboard/components/DashboardIcon";

export default function DashboardPageHeader({ icon, eyebrow, title, description, chips = [] }) {
  return (
    <section className="dashboard-page-header">
      <div className="dashboard-page-header-main">
        <span className="dashboard-page-header-icon" aria-hidden="true">
          <DashboardIcon name={icon} />
        </span>

        <div className="dashboard-page-header-copy">
          <span className="dashboard-kicker">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </div>

      {chips.length ? (
        <div className="dashboard-page-header-chips">
          {chips.map((chip) => (
            <span key={chip} className="dashboard-page-header-chip">
              {chip}
            </span>
          ))}
        </div>
      ) : null}
    </section>
  );
}
