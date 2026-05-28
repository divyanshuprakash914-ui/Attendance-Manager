import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import "../Dashboard/Dashboard.css";
import DashboardIcon from "../Dashboard/components/DashboardIcon";
import DashboardSidebar from "../Dashboard/components/DashboardSidebar";
import DashboardTopbar from "../Dashboard/components/DashboardTopbar";
import useDashboardAccess from "../Dashboard/useDashboardAccess";
import SettingsAccountPanel from "./components/SettingsAccountPanel";
import SettingsApiPanel from "./components/SettingsApiPanel";
import SettingsNotificationsPanel from "./components/SettingsNotificationsPanel";
import SettingsProfileNav from "./components/SettingsProfileNav";
import SettingsProfilePanel from "./components/SettingsProfilePanel";
import SettingsSkillsPanel from "./components/SettingsSkillsPanel";
import {
  accountRecord,
  apiAccessRecord,
  notificationRecord,
  settingsSections,
  skillsRecord,
} from "./SettingsData";
import { getAvatarInitials } from "./profileStorage";
import "./SettingsPage.css";

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("profile");
  const { user, profile, profileCompletion, profileUnlocked, navigationItems, loading, error } =
    useDashboardAccess();

  const enabledNotifications = useMemo(
    () => notificationRecord.filter((item) => item.enabled).length,
    [],
  );

  const accountProtectionCount = useMemo(
    () => Number(accountRecord.twoFactorEnabled) + Number(accountRecord.loginAlerts),
    [],
  );

  const resolvedName = profile.name || user.name || "User";
  const resolvedRole = profile.role || user.role || "Workspace user";
  const resolvedTimezone = profile.timezone || user.timezone || "Timezone not set";

  const activeSectionMeta = useMemo(
    () => settingsSections.find((section) => section.id === activeSection) ?? settingsSections[0],
    [activeSection],
  );

  function renderPanel() {
    switch (activeSection) {
      case "skills":
        return <SettingsSkillsPanel initialSkills={skillsRecord} />;
      case "notifications":
        return <SettingsNotificationsPanel initialNotifications={notificationRecord} />;
      case "account":
        return <SettingsAccountPanel initialAccount={accountRecord} />;
      case "api":
        return <SettingsApiPanel initialApiAccess={apiAccessRecord} />;
      case "profile":
      default:
        return (
          <SettingsProfilePanel
            key={[
              profile.name,
              profile.email,
              profile.phone,
              profile.institution,
              profile.role,
              profile.department,
              profile.location,
              profile.timezone,
              profile.bio,
            ].join("|")}
            initialProfile={profile}
            profileUnlocked={profileUnlocked}
          />
        );
    }
  }

  if (loading) {
    return <div className="dashboard-feedback-state">Loading settings...</div>;
  }

  if (error) {
    return <div className="dashboard-feedback-state is-error">{error}</div>;
  }

  return (
    <div className="dashboard-page settings-page">
      <div className="dashboard-shell">
        <DashboardSidebar
          items={navigationItems}
          activeItem="Settings"
          profileName={resolvedName}
          profileRole={resolvedRole}
        />

        <div className="dashboard-main">
          <DashboardTopbar profileName={resolvedName} />

          <main className="dashboard-content settings-content">
            <section className="settings-header">
              <div className="settings-header-main">
                <div className="settings-header-copy">
                  <span className="dashboard-kicker">Settings</span>
                  <h1>Workspace settings</h1>
                  <p>Keep profile, notifications, security, and team preferences clean in one place.</p>

                  <div className="settings-header-tags">
                    <span className="settings-header-tag">
                      <strong>{activeSectionMeta.label}</strong>
                      <small>Current section</small>
                    </span>

                    <span className="settings-header-tag">
                      <strong>{profileCompletion}%</strong>
                      <small>Profile completion</small>
                    </span>

                    <span className="settings-header-tag">
                      <strong>{enabledNotifications}</strong>
                      <small>Active notifications</small>
                    </span>

                    <span className="settings-header-tag">
                      <strong>
                        {accountProtectionCount}/{Math.max(accountProtectionCount, 2)}
                      </strong>
                      <small>Security checks</small>
                    </span>
                  </div>
                </div>
              </div>

              <article className="settings-header-profile">
                <span className="settings-header-avatar">{getAvatarInitials(resolvedName)}</span>

                <div className="settings-header-profile-copy">
                  <strong>{resolvedName}</strong>
                  <span>{resolvedRole}</span>
                  <small>
                    {accountRecord.sessions.length} signed-in devices · {resolvedTimezone}
                  </small>
                </div>

                {profileUnlocked ? (
                  <Link to="/dashboard" className="settings-header-profile-action">
                    Open dashboard
                  </Link>
                ) : (
                  <span className="settings-header-profile-icon" aria-hidden="true">
                    <DashboardIcon name="settings" />
                  </span>
                )}
              </article>
            </section>

            <section className="settings-layout">
              <SettingsProfileNav
                sections={settingsSections}
                activeSection={activeSection}
                onSelect={setActiveSection}
              />

              <div className="settings-stack">{renderPanel()}</div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
