export default function SettingsSectionIcon({ name }) {
  switch (name) {
    case "skills":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 8h10" />
          <path d="M7 12h6" />
          <path d="M7 16h8" />
          <path d="M17 7.5 19.5 10 17 12.5" />
        </svg>
      );
    case "notifications":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M15 17H5.5a1.5 1.5 0 0 1-1.2-2.4l1.2-1.6V9a6 6 0 0 1 12 0v4l1.2 1.6a1.5 1.5 0 0 1-1.2 2.4H9" />
          <path d="M10 20a2.4 2.4 0 0 0 4 0" />
        </svg>
      );
    case "account":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 20s-6-2.8-6-7.7V5.5L12 3l6 2.5v6.8C18 17.2 12 20 12 20Z" />
          <path d="M9.6 12.3 11 13.8l3.4-4" />
        </svg>
      );
    case "api":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8 10.5a3.5 3.5 0 1 1 0-7h3.2" />
          <path d="M16 13.5a3.5 3.5 0 1 1 0 7h-3.2" />
          <path d="M9.5 14.5 14.5 9.5" />
        </svg>
      );
    case "profile":
    default:
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5 19a7 7 0 0 1 14 0" />
        </svg>
      );
  }
}
