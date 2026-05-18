export const sidebarItems = [
  { label: "Overview", icon: "grid", active: true },
  { label: "Students", icon: "users" },
  { label: "Attendance", icon: "calendar" },
  { label: "Approvals", icon: "check" },
  { label: "Reports", icon: "chart" },
  { label: "Mentors", icon: "mentor" },
  { label: "Settings", icon: "settings" },
];

export const dashboardStats = [
  {
    icon: "users",
    value: "1,426",
    label: "Active students",
    delta: "+12%",
    trend: "up",
  },
  {
    icon: "calendar",
    value: "18",
    label: "Sessions today",
    delta: "+3",
    trend: "up",
  },
  {
    icon: "check",
    value: "34",
    label: "Pending reviews",
    delta: "+5",
    trend: "up",
  },
  {
    icon: "chart",
    value: "94.8%",
    label: "Attendance rate",
    delta: "-2%",
    trend: "down",
  },
];

export const activitySeries = {
  labels: ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "W9", "W10", "W11", "W12"],
  points: [44, 52, 58, 56, 64, 70, 67, 76, 73, 82, 86, 92],
};

export const recentActivity = [
  {
    title: "New attendance sync from Semester 6",
    meta: "Computer Science • Section B",
    time: "2 min ago",
  },
  {
    title: "Correction request approved",
    meta: "Faculty queue cleared for 14 records",
    time: "15 min ago",
  },
  {
    title: "At-risk alert triggered",
    meta: "Mechanical • 11 students below threshold",
    time: "1 hr ago",
  },
  {
    title: "Weekly report generated",
    meta: "Coordinator digest shared with mentors",
    time: "3 hr ago",
  },
];
