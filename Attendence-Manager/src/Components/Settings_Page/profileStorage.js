export const PROFILE_STORAGE_KEY = "attendease_profile_record";
export const PROFILE_UPDATE_EVENT = "attendease-profile-updated";

const PROFILE_COMPLETION_FIELDS = [
  "name",
  "email",
  "institution",
  "role",
  "department",
  "location",
  "timezone",
  "bio",
];

function isFilled(value) {
  if (typeof value === "string") {
    return value.trim().length > 0;
  }

  return Boolean(value);
}

export function getStoredProfileRecord() {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const raw = window.localStorage.getItem(PROFILE_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveStoredProfileRecord(profile) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
    window.dispatchEvent(new CustomEvent(PROFILE_UPDATE_EVENT, { detail: profile }));
  } catch {
    return;
  }
}

export function subscribeToStoredProfile(callback) {
  if (typeof window === "undefined") {
    return () => {};
  }

  function handleProfileUpdate(event) {
    callback(event.detail || getStoredProfileRecord());
  }

  function handleStorage(event) {
    if (event.key === PROFILE_STORAGE_KEY) {
      callback(getStoredProfileRecord());
    }
  }

  window.addEventListener(PROFILE_UPDATE_EVENT, handleProfileUpdate);
  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener(PROFILE_UPDATE_EVENT, handleProfileUpdate);
    window.removeEventListener("storage", handleStorage);
  };
}

export function buildProfileRecord(baseProfile = {}, user = {}, storedProfile = {}) {
  return {
    ...baseProfile,
    name: user.name || baseProfile.name || "",
    email: user.email || baseProfile.email || "",
    phone: user.phone || baseProfile.phone || "",
    institution: user.institution || user.college || baseProfile.institution || "",
    role: user.role || baseProfile.role || "",
    department: user.department || baseProfile.department || "",
    location: user.location || user.city || baseProfile.location || "",
    timezone: user.timezone || baseProfile.timezone || "",
    bio: user.bio || baseProfile.bio || "",
    ...storedProfile,
  };
}

export function getProfileCompletionFromRecord(profile = {}) {
  const completedCount = PROFILE_COMPLETION_FIELDS.filter((field) => isFilled(profile[field])).length;
  return Math.round((completedCount / PROFILE_COMPLETION_FIELDS.length) * 100);
}

export function getAvatarInitials(name = "") {
  const cleanName = String(name).trim();

  if (!cleanName) {
    return "U";
  }

  return cleanName
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
