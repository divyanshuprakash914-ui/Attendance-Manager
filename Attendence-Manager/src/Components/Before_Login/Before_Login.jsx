import { Link } from "react-router-dom";

import "./Before_Login.css";
import Footer from "./Footer";
import Navbar_Before_Login from "./Navbar";

const trustItems = [
  "Engineering colleges",
  "Universities",
  "Mentor-led academies",
  "Multi-campus programs",
];

const heroHighlights = [
  "Realtime attendance sync",
  "Risk alerts for weak sections",
  "Clean review and approval flow",
];

const storyMetrics = [
  { value: "99.2%", label: "daily sync completion" },
  { value: "42", label: "active sections tracked in one workspace" },
  { value: "3x", label: "faster daily review than manual sheets" },
];

const featureCards = [
  {
    eyebrow: "Capture",
    title: "Flexible check-ins for the way each classroom actually works.",
    description:
      "QR, biometric, device-based, and manual attendance all stay in one clean flow.",
    tone: "feature-card-teal",
  },
  {
    eyebrow: "Visibility",
    title: "A calmer view for coordinators, mentors, and program leads.",
    description:
      "See weak sections, pending corrections, and attendance drift before it becomes report work.",
    tone: "feature-card-pink",
  },
  {
    eyebrow: "Action",
    title: "Follow-up that feels immediate instead of administrative.",
    description:
      "Warnings, approvals, and mentor steps route automatically with a lighter daily workflow.",
    tone: "feature-card-violet",
  },
];

const workflowSteps = [
  {
    step: "01",
    title: "Capture in class",
    text: "Faculty marks attendance in the fastest mode available for that room.",
  },
  {
    step: "02",
    title: "Surface the signal",
    text: "AttendEase highlights risk, low attendance, and pending review in one place.",
  },
  {
    step: "03",
    title: "Move the response",
    text: "Mentors, students, and admins each get the next action without clutter.",
  },
];

const resourceCards = [
  {
    title: "Policy setup",
    text: "Start with templates for thresholds, correction rules, and approval logic.",
  },
  {
    title: "Faculty onboarding",
    text: "Keep rollout simple with a cleaner classroom capture flow from day one.",
  },
  {
    title: "Reporting handoff",
    text: "Export-ready views make it easier to align departments and admin teams.",
  },
];

export default function BeforeLogin() {
  return (
    <div className="before-login-shell" id="home">
      <Navbar_Before_Login />

      <main className="landing-main">
        <section className="hero-section">
          <div className="hero-copy">
            <span className="hero-badge">Inspired by modern motion-product storytelling</span>
            <h1>Make attendance feel lighter, clearer, and easier to act on.</h1>
            <p className="hero-description">
              AttendEase brings capture, review, and intervention into one
              editorial-style workspace so campus teams can spend less time
              untangling records and more time responding early.
            </p>

            <div className="hero-actions">
              <Link to="/login" className="hero-button hero-button-primary">
                Start free
              </Link>
              <a href="#products" className="hero-button hero-button-secondary">
                Explore platform
              </a>
            </div>

            <div className="hero-highlight-row">
              {heroHighlights.map((item) => (
                <span key={item} className="hero-highlight-pill">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="hero-stage" aria-label="AttendEase motion-inspired showcase">
            <div className="hero-stage-shell">
              <div className="hero-stage-top">
                <div className="stage-dots" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                <span className="stage-label">AttendEase workspace</span>
                <span className="stage-badge">Live sync</span>
              </div>

              <div className="hero-stage-body">
                <article className="stage-hero-card">
                  <span className="mini-kicker">Daily command layer</span>
                  <h2>Attendance capture, risk visibility, and follow-up in one motion-ready flow.</h2>
                  <div className="stage-hero-meta">
                    <span>1,284 students marked today</span>
                    <strong>18 items need review</strong>
                  </div>
                </article>

                <div className="stage-motion-map" aria-hidden="true">
                  <div className="motion-orb motion-orb-cyan" />
                  <div className="motion-orb motion-orb-pink" />
                  <div className="motion-orb motion-orb-violet" />
                  <div className="motion-path motion-path-one" />
                  <div className="motion-path motion-path-two" />
                  <div className="motion-card motion-card-a">
                    <strong>Section pulse</strong>
                    <span>Realtime classroom stability</span>
                  </div>
                  <div className="motion-card motion-card-b">
                    <strong>Mentor action</strong>
                    <span>Low-attendance warning routed</span>
                  </div>
                  <div className="motion-card motion-card-c">
                    <strong>Correction queue</strong>
                    <span>Approval review updated</span>
                  </div>
                </div>

                <div className="hero-marquee">
                  <div className="hero-marquee-track">
                    {[...heroHighlights, ...heroHighlights, ...heroHighlights].map((item, index) => (
                      <span key={`${item}-${index}`} className="hero-marquee-pill">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="trust-strip" aria-label="Audience served">
          <div className="section-shell trust-shell">
            <span className="section-tag">Built for modern academic teams</span>
            <div className="trust-pill-row">
              {trustItems.map((item) => (
                <span key={item} className="trust-pill">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section story-section" id="solutions">
          <div className="section-shell">
            <div className="section-heading-block">
              <div>
                <span className="section-tag">Story</span>
                <h2>A landing page that feels more like a product story than an admin brochure.</h2>
              </div>
              <p>
                The experience is intentionally lighter now: fewer blocks, stronger
                motion cues, brighter surfaces, and a more editorial rhythm inspired
                by LottieFiles&apos; modern about-page style.
              </p>
            </div>

            <div className="story-layout">
              <article className="story-panel story-panel-main">
                <span className="story-kicker">Why this direction works</span>
                <h3>It makes AttendEase look like a modern platform instead of a busy admin tool.</h3>
                <p>
                  The theme shifts away from dense enterprise boxes and toward a
                  cleaner product narrative: bold copy, airy spacing, motion-inspired
                  graphics, and fewer decisions on screen at once.
                </p>
              </article>

              <div className="story-metric-grid">
                {storyMetrics.map((item) => (
                  <article key={item.label} className="story-metric-card">
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="content-section" id="products">
          <div className="section-shell">
            <div className="section-heading-block">
              <div>
                <span className="section-tag">Platform</span>
                <h2>Less operational noise. More visual clarity.</h2>
              </div>
              <p>
                Every layer is simplified so the product feels closer to a modern
                creative platform while still solving real attendance operations.
              </p>
            </div>

            <div className="feature-grid">
              {featureCards.map((card) => (
                <article key={card.title} className={`feature-card ${card.tone}`}>
                  <span className="feature-eyebrow">{card.eyebrow}</span>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </article>
              ))}

              <article className="feature-wide-card">
                <div className="feature-wide-copy">
                  <span className="feature-eyebrow">Motion-led preview</span>
                  <h3>Animated surfaces keep the page alive without turning it into UI clutter.</h3>
                  <p>
                    Instead of a heavy marketing layout, the page now leans on motion,
                    storytelling, and cleaner platform positioning.
                  </p>
                </div>

                <div className="feature-chip-cloud" aria-hidden="true">
                  <span className="chip chip-cyan">Realtime pulse</span>
                  <span className="chip chip-pink">Risk alerts</span>
                  <span className="chip chip-violet">Approvals</span>
                  <span className="chip chip-gold">Student visibility</span>
                  <span className="chip chip-navy">Mentor workflow</span>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="content-section workflow-section">
          <div className="section-shell">
            <div className="section-heading-block">
              <div>
                <span className="section-tag">Workflow</span>
                <h2>Capture. detect. resolve.</h2>
              </div>
              <p>
                The flow is still operationally serious, but the presentation is
                cleaner and more contemporary.
              </p>
            </div>

            <div className="workflow-layout">
              <article className="workflow-track">
                {workflowSteps.map((item) => (
                  <div key={item.step} className="workflow-step">
                    <span className="workflow-step-number">{item.step}</span>
                    <div>
                      <strong>{item.title}</strong>
                      <p>{item.text}</p>
                    </div>
                  </div>
                ))}
              </article>

              <article className="workflow-quote-card">
                <span className="story-kicker">Campus view</span>
                <h3>Clean enough for a landing page. Strong enough for real daily operations.</h3>
                <p>
                  Faculty gets faster entry. Coordinators see risk earlier. Admin teams
                  retain one dependable layer for reporting and policy control.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="content-section" id="resources">
          <div className="section-shell resource-shell">
            <div className="resource-copy">
              <span className="section-tag">Resources</span>
              <h2>Roll out with the same clarity as the landing page.</h2>
              <p>
                The support layer stays concise too: policy guidance, onboarding help,
                and cleaner reporting handoff for campus teams.
              </p>

              <Link to="/login" className="hero-button hero-button-primary">
                Book a walkthrough
              </Link>
            </div>

            <div className="resource-grid">
              {resourceCards.map((card) => (
                <article key={card.title} className="resource-card">
                  <strong>{card.title}</strong>
                  <p>{card.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
