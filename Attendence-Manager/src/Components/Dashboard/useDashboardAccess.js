import { useEffect, useMemo, useState } from "react";

import { getDashboardOverview } from "../../lib/api";
import { authenticatedSidebarItems, sidebarItems } from "./DashboardData";
import { profileRecord } from "../Settings_Page/SettingsData";
import {
  buildProfileRecord,
  getProfileCompletionFromRecord,
  getStoredProfileRecord,
  subscribeToStoredProfile,
} from "../Settings_Page/profileStorage";

function toNumber(value, fallback = 0) {
  const parsed = Number.parseFloat(String(value).replace("%", ""));
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function getProfileCompletion(user = {}) {
  return toNumber(
    user.profile_completion_percentage ??
      user.profileCompletionPercentage ??
      user.profile_completion ??
      user.profileCompletion ??
      user.profile_percentage ??
      user.profilePercentage ??
      user.profile_percent ??
      (user.profile_completed ?? user.profileComplete ?? user.is_profile_complete ? 100 : 0),
    0,
  );
}

export function isProfileUnlocked(user = {}) {
  const explicitCompleted = user.profile_completed ?? user.profileComplete ?? user.is_profile_complete;

  if (typeof explicitCompleted === "boolean" && explicitCompleted) {
    return true;
  }

  return getProfileCompletion(user) >= 85;
}

export default function useDashboardAccess() {
  const [dashboardData, setDashboardData] = useState(null);
  const [storedProfile, setStoredProfile] = useState(() => getStoredProfileRecord());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        const data = await getDashboardOverview();
        setDashboardData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load dashboard.");
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  useEffect(() => subscribeToStoredProfile(setStoredProfile), []);

  const user = useMemo(() => dashboardData?.user || {}, [dashboardData]);
  const profile = useMemo(
    () => buildProfileRecord(profileRecord, user, storedProfile),
    [storedProfile, user],
  );

  const backendProfileCompletion = getProfileCompletion(user);
  const localProfileCompletion = getProfileCompletionFromRecord(profile);
  const profileCompletion = Math.max(backendProfileCompletion, localProfileCompletion);
  const profileUnlocked = isProfileUnlocked(user) || profileCompletion >= 85;

  const navigationItems = useMemo(
    () => (profileUnlocked ? sidebarItems : authenticatedSidebarItems),
    [profileUnlocked],
  );

  return {
    dashboardData,
    user,
    profile,
    profileCompletion,
    profileUnlocked,
    navigationItems,
    loading,
    error,
  };
}
