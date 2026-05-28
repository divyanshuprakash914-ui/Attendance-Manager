export const settingsSections = [
  {
    id: "profile",
    label: "Profile",
    description: "Photo, name, email and identity",
    icon: "profile",
  },
  {
    id: "skills",
    label: "Skills",
    description: "Expertise, focus areas and tools",
    icon: "skills",
  },
  {
    id: "notifications",
    label: "Notifications",
    description: "Alerts, digests and reminders",
    icon: "notifications",
  },
  {
    id: "account",
    label: "Account",
    description: "Security, sessions and access",
    icon: "account",
  },
  {
    id: "api",
    label: "API access",
    description: "Bearer token and client secret",
    icon: "api",
  },
];

export const profileRecord = {
  name: "Divyanshu Prakash",
  email: "divyanshuprakash914@gmail.com",
  phone: "",
  institution: "",
  role: "Admin coordinator",
  department: "",
  location: "",
  timezone: "",
  bio: "",
};

export const skillsRecord = {
  primaryRole: "Operations lead",
  experience: "Advanced",
  selected: [
    "Attendance analytics",
    "Approval workflows",
    "Faculty coordination",
    "Student support",
  ],
  suggestions: [
    "Attendance analytics",
    "Approval workflows",
    "Faculty coordination",
    "Student support",
    "Data exports",
    "Mentor reporting",
    "Automation rules",
    "Compliance reviews",
  ],
};

export const notificationRecord = [
  {
    key: "emailDigests",
    title: "Email digests",
    description: "Send daily and weekly attendance summaries to your inbox.",
    enabled: true,
  },
  {
    key: "riskAlerts",
    title: "Risk alerts",
    description: "Notify you when students or sections fall below threshold.",
    enabled: true,
  },
  {
    key: "approvalReminders",
    title: "Approval reminders",
    description: "Remind you about pending correction requests and escalations.",
    enabled: false,
  },
  {
    key: "productUpdates",
    title: "Product updates",
    description: "Share new AttendEase improvements and release notes.",
    enabled: true,
  },
];

export const accountRecord = {
  recoveryEmail: "divyanshuprakash914@gmail.com",
  twoFactorEnabled: true,
  loginAlerts: true,
  sessions: [
    { device: "MacBook Pro · Chrome", location: "Jaipur, India", current: true },
    { device: "iPhone 15 · Safari", location: "Jaipur, India", current: false },
    { device: "Office PC · Edge", location: "Delhi, India", current: false },
  ],
};

export const apiAccessRecord = {
  bearerToken: "ae_live_sk_8d2b4f6a12exampletoken91x7",
  clientSecret: "client_secret_9e7c1d4example8b3f",
};
