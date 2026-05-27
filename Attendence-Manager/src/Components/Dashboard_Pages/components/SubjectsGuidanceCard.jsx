import { Link } from "react-router-dom";

export default function SubjectsGuidanceCard({ title, summary, bullets, actionLabel, actionPath }) {
  return (
    <article className="subjects-guidance-card">
      <div className="subjects-guidance-layout">
        <div className="subjects-guidance-intro">
          <div className="subjects-guidance-head">
            <span className="subjects-guidance-mark" aria-hidden="true">
              ✦
            </span>
            <div className="subjects-guidance-copy">
              <h3>{title}</h3>
              <p>{summary}</p>
            </div>
          </div>

          {actionLabel && actionPath ? (
            <Link to={actionPath} className="subjects-guidance-link">
              {actionLabel}
              <span aria-hidden="true">→</span>
            </Link>
          ) : null}
        </div>

        <div className="subjects-guidance-list">
          {bullets.map((item) => (
            <div key={item.label} className="subjects-guidance-item">
              <strong>{item.label}</strong>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
