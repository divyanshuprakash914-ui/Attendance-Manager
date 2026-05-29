import { Link } from "react-router-dom";

import BrandLogo from "../Common/BrandLogo";
import "./Footer.css";

const footerLinks = [
  { label: "Platform", href: "#products" },
  { label: "Story", href: "#solutions" },
  { label: "Resources", href: "#resources" },
  { label: "Log in", href: "/login" },
];

const footerGroups = [
  {
    title: "Explore",
    links: [
      { label: "Platform overview", href: "#products" },
      { label: "Workflow story", href: "#solutions" },
      { label: "Launch resources", href: "#resources" },
    ],
  },
  {
    title: "Access",
    links: [
      { label: "Log in", href: "/login" },
      { label: "Create account", href: "/create-account" },
      { label: "Book walkthrough", href: "/login" },
    ],
  },
];

const footerSignals = [
  "99.2% daily sync",
  "Realtime alerts",
  "Faculty-first flow",
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="footer-top-row">
          <a href="#home" className="footer-brand-block">
            <span className="footer-brand-mark">
              <BrandLogo variant="emblem" decorative className="footer-brand-mark-image" />
            </span>
            <div className="footer-brand-copy">
              <strong>AttendEase</strong>
              <p>Attendance, designed with clarity for faculty, mentors, and campus teams.</p>
            </div>
          </a>

          <div className="footer-signal-block">
            <span className="footer-signal-label">Campus-ready workspace</span>
            <div className="footer-signal-row">
              {footerSignals.map((item) => (
                <span key={item} className="footer-signal-pill">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-main-grid">
          <div className="footer-links-panel">
            {footerGroups.map((group) => (
              <div key={group.title} className="footer-link-group">
                <span className="footer-link-group-title">{group.title}</span>
                <div className="footer-link-column">
                  {group.links.map((item) => (
                    <a key={item.label} href={item.href} className="footer-link footer-link-block">
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="footer-cta-panel">
            <span className="footer-cta-kicker">Ready to launch?</span>
            <strong>Bring attendance into one cleaner daily workflow.</strong>
            <p>Move from scattered sheets and manual follow-up to one dependable operating layer.</p>
            <Link to="/create-account" className="footer-cta-button">
              Start with AttendEase
            </Link>
          </div>
        </div>

        <div className="footer-bottom-row">
          <div className="footer-link-row">
            {footerLinks.map((item) => (
              <a key={item.label} href={item.href} className="footer-link">
                {item.label}
              </a>
            ))}
          </div>

          <div className="footer-meta">
            <span>Realtime attendance workspace</span>
            <span>© 2026 AttendEase</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
