import "./DashboardDefinitionCard.css";

export default function DashboardDefinitionCard({ items }) {
  return (
    <article className="dashboard-definition-card">
      <h2>Definitions</h2>

      <div className="dashboard-definition-list">
        {items.map((item) => (
          <div key={item.term} className="dashboard-definition-item">
            <strong>{item.term}</strong>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
