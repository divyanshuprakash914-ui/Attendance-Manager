export default function DashboardIcon({ name }) {
  switch (name) {
    case "home":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 10.5 12 4l8 6.5" />
          <path d="M6.5 9.5V20h11V9.5" />
        </svg>
      );
    case "book":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 5.5A2.5 2.5 0 0 1 7.5 3H19v16H7.5A2.5 2.5 0 0 0 5 21V5.5Z" />
          <path d="M5 18.5A2.5 2.5 0 0 1 7.5 16H19" />
          <path d="M9 7h6" />
          <path d="M9 10h5" />
        </svg>
      );
    case "users":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M16 19v-1a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v1" />
          <circle cx="10" cy="8" r="3" />
          <path d="M20 19v-1.2a3.2 3.2 0 0 0-2.4-3.1" />
          <path d="M15.7 5.2a3 3 0 0 1 0 5.6" />
        </svg>
      );
    case "calendar":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="5" width="18" height="16" rx="3" />
          <path d="M16 3v4M8 3v4M3 10h18" />
        </svg>
      );
    case "attendance":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="4" y="3.5" width="16" height="17" rx="3" />
          <path d="M8 8h8" />
          <path d="m8.5 13 2 2 5-5" />
        </svg>
      );
    case "check":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20 7 10.5 16.5 6 12" />
          <path d="M20 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8" />
        </svg>
      );
    case "chart":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 19h16" />
          <path d="M7 15 11 11l3 3 5-6" />
          <path d="M17 8h2v2" />
        </svg>
      );
    case "trend":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 19h16" />
          <path d="M6 15.5c2.3-2.8 3.8-4.2 5.8-4.2 1.8 0 2.9 1.8 4.2 1.8 1.1 0 1.9-.7 3-2.1" />
          <path d="M16.8 9H20v3.2" />
        </svg>
      );
    case "report":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 3.5h7l4 4V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-15a1 1 0 0 1 1-1Z" />
          <path d="M14 3.5V8h4" />
          <path d="M9 13h6" />
          <path d="M9 16.5h4" />
        </svg>
      );
    case "bell":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M15 17H5.5a1.5 1.5 0 0 1-1.2-2.4l1.2-1.6V9a6 6 0 0 1 12 0v4l1.2 1.6a1.5 1.5 0 0 1-1.2 2.4H9" />
          <path d="M10 20a2.4 2.4 0 0 0 4 0" />
        </svg>
      );
    case "leave":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="4" y="3.5" width="16" height="17" rx="3" />
          <path d="M8 8h8" />
          <path d="M8 12h8" />
          <path d="M8 16h5" />
        </svg>
      );
    case "spark":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m12 3 1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3Z" />
          <path d="m19 15 .9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15Z" />
        </svg>
      );
    case "mentor":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 20s-6-2.8-6-7.7V5.5L12 3l6 2.5v6.8C18 17.2 12 20 12 20Z" />
          <path d="m9.5 11.8 1.6 1.6 3.4-3.8" />
        </svg>
      );
    case "settings":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="3.2" />
          <path d="M19.4 15a1 1 0 0 0 .2 1.1l.1.1a2 2 0 0 1 0 2.8 2 2 0 0 1-2.8 0l-.1-.1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.9V20a2 2 0 0 1-4 0v-.2a1 1 0 0 0-.6-.9 1 1 0 0 0-1.1.2l-.1.1a2 2 0 0 1-2.8 0 2 2 0 0 1 0-2.8l.1-.1a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.6H4a2 2 0 0 1 0-4h.2a1 1 0 0 0 .9-.6 1 1 0 0 0-.2-1.1l-.1-.1a2 2 0 0 1 0-2.8 2 2 0 0 1 2.8 0l.1.1a1 1 0 0 0 1.1.2 1 1 0 0 0 .6-.9V4a2 2 0 0 1 4 0v.2a1 1 0 0 0 .6.9 1 1 0 0 0 1.1-.2l.1-.1a2 2 0 0 1 2.8 0 2 2 0 0 1 0 2.8l-.1.1a1 1 0 0 0-.2 1.1 1 1 0 0 0 .9.6h.2a2 2 0 0 1 0 4h-.2a1 1 0 0 0-.9.6Z" />
        </svg>
      );
    case "book-open":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3.5 6.5A2.5 2.5 0 0 1 6 4h5.5v15H6a2.5 2.5 0 0 0-2.5 2.5V6.5Z" />
          <path d="M20.5 6.5A2.5 2.5 0 0 0 18 4h-5.5v15H18a2.5 2.5 0 0 1 2.5 2.5V6.5Z" />
        </svg>
      );
    case "attendance-card":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="4" y="4" width="16" height="16" rx="3" />
          <path d="M7.5 8.5h9" />
          <path d="M7.5 12h5.5" />
          <path d="m8 16 1.5 1.5L13 14" />
        </svg>
      );
    case "classes":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 7a2 2 0 0 1 2-2h3v4H6V7Z" />
          <path d="M13 5h3a2 2 0 0 1 2 2v2h-5V5Z" />
          <path d="M6 11h5v8H8a2 2 0 0 1-2-2v-6Z" />
          <path d="M13 11h5v6a2 2 0 0 1-2 2h-3v-8Z" />
        </svg>
      );
    case "needed":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="4" y="3.5" width="16" height="17" rx="3" />
          <path d="M8 8h8" />
          <path d="M8 12h5" />
          <path d="M12 16h4" />
          <path d="M8 16h1" />
        </svg>
      );
    case "bunks":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="8" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    case "grid":
    default:
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="4" y="4" width="6.5" height="6.5" rx="1.5" />
          <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" />
          <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" />
          <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5" />
        </svg>
      );
  }
}
