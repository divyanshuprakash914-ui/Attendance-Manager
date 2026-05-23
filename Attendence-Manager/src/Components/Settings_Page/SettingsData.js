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
];

export const profileRecord = {
  name: "Divyanshu Prakash",
  email: "divyanshuprakash914@gmail.com",
  phone: "+91 98765 43210",
  institution: "AttendEase University",
  role: "Admin coordinator",
  department: "Campus operations",
  location: "Jaipur, India",
  timezone: "Asia/Kolkata",
  bio: "Building a cleaner attendance system for students, mentors, and campus operations teams.",
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
