import { useMemo, useState } from "react";

import "../Dashboard/Dashboard.css";
import { sidebarItems } from "../Dashboard/DashboardData";
import DashboardIcon from "../Dashboard/components/DashboardIcon";
import DashboardSidebar from "../Dashboard/components/DashboardSidebar";
import DashboardTopbar from "../Dashboard/components/DashboardTopbar";
import SettingsAccountPanel from "./components/SettingsAccountPanel";
import SettingsNotificationsPanel from "./components/SettingsNotificationsPanel";
import SettingsProfileNav from "./components/SettingsProfileNav";
import SettingsProfilePanel from "./components/SettingsProfilePanel";
import SettingsSkillsPanel from "./components/SettingsSkillsPanel";
import {
  accountRecord,
  notificationRecord,
  profileRecord,
  settingsSections,
  skillsRecord,
} from "./SettingsData";
import "./SettingsPage.css";

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("profile");

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
      case "profile":
      default:
        return <SettingsProfilePanel initialProfile={profileRecord} />;
    }
  }

  return (
    <div className="dashboard-page settings-page">
      <div className="dashboard-shell">
        <DashboardSidebar items={sidebarItems} activeItem="Settings" />

        <div className="dashboard-main">
          <DashboardTopbar />

          <main className="dashboard-content settings-content">
            <section className="settings-header">
              <div className="settings-header-main">
                <span className="settings-header-icon" aria-hidden="true">
                  <DashboardIcon name="settings" />
                </span>

                <div>
                  <span className="dashboard-kicker">Settings</span>
                  <h1>{activeSectionMeta.label}</h1>
                </div>
              </div>

              <p>{activeSectionMeta.description}</p>
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
