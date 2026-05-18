import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

import "./Navbar.css";

const navItems = [
  { label: "Platform", id: "products" },
  { label: "Story", id: "solutions" },
  { label: "Resources", id: "resources" },
];

export default function Navbar_Before_Login() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const isHomePage = pathname === "/";
  const isLoginPage = pathname === "/login";
  const getSectionHref = (id) => (isHomePage ? `#${id}` : `/#${id}`);
  const homeHref = isHomePage ? "#home" : "/#home";
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="navbar-shell">
      <nav className="navbar" aria-label="Primary navigation">
        <a className="brand" href={homeHref} onClick={closeMenu}>
          <span className="brand-mark" aria-hidden="true">
            A
          </span>
          <span className="brand-copy">
            <strong>AttendEase</strong>
            <span>Attendance, designed with clarity</span>
          </span>
        </a>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={isMenuOpen}
          aria-controls="nav-panel"
          aria-label="Toggle navigation menu"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <div id="nav-panel" className={`nav-panel ${isMenuOpen ? "is-open" : ""}`}>
          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={getSectionHref(item.id)} onClick={closeMenu}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="nav-buttons">
            <Link to={isLoginPage ? "/" : "/login"} className="button login_btn" onClick={closeMenu}>
              {isLoginPage ? "Back home" : "Log in"}
            </Link>
            <Link to="/create-account" className="button create_btn" onClick={closeMenu}>
              Create account
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
