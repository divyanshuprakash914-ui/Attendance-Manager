export const sidebarItems = [
  { label: "Dashboard", icon: "home", path: "/dashboard" },
  { label: "Subjects", icon: "book", path: "/dashboard/subjects" },
  { label: "Timetable", icon: "calendar", path: "/dashboard/timetable" },
  { label: "Attendance", icon: "attendance", path: "/dashboard/attendance" },
  { label: "Bunk Planner", icon: "trend", path: "/dashboard/bunk-planner" },
  { label: "Reports", icon: "report", path: "/dashboard/reports" },
  { label: "Alerts", icon: "bell", path: "/dashboard/alerts" },
  { label: "Leave Tracker", icon: "leave", path: "/dashboard/leave-tracker" },
  { label: "Assignments Solver", icon: "spark", badge: "New", path: "/dashboard/assignments-solver" },
  { label: "Settings", icon: "settings", path: "/dashboard/settings" },
];

export const authenticatedSidebarItems = [
  { label: "Dashboard", icon: "home", path: "/dashboard" },
  { label: "Settings", icon: "settings", path: "/dashboard/settings" },
];

export const dashboardHeader = {
  greeting: "Good morning, Vani! 👋",
  subtitle: "Here's your attendance overview",
  dateLabel: "May 18, 2025 • Sunday",
};

export const overviewStats = [
  {
    icon: "book-open",
    title: "Overall Attendance",
    value: "82.35%",
    subtitle: "171 / 208 Lectures",
    accent: "purple",
    progress: 82.35,
  },
  {
    icon: "attendance-card",
    title: "Classes Attended",
    value: "171",
    subtitle: "Total Lectures",
    accent: "green",
  },
  {
    icon: "classes",
    title: "Classes Conducted",
    value: "208",
    subtitle: "Total Lectures",
    accent: "amber",
  },
  {
    icon: "needed",
    title: "Classes Needed",
    value: "14",
    subtitle: "To reach 77%",
    accent: "red",
  },
  {
    icon: "bunks",
    title: "Bunks Allowed",
    value: "12",
    subtitle: "More classes",
    accent: "blue",
    emphasized: true,
  },
];

export const attendanceTrend = {
  title: "Attendance Trend",
  subtitle: "Last 6 Weeks",
  legend: "Attendance %",
  labels: ["Apr 6-12", "Apr 13-19", "Apr 20-26", "Apr 27-May 3", "May 4-10", "May 11-17"],
  values: [74.3, 76.8, 78.6, 81.2, 82.1, 82.4],
};

export const subjectGroupAttendance = {
  title: "Attendance by Subject Group",
  bars: [
    { label: "Math + Math Lab", value: 87.2, color: "#7c4dff" },
    { label: "WAP + WAP Lab", value: 84.6, color: "#2f80ed" },
    { label: "Applied Chem + Lab", value: 81.3, color: "#1db954" },
    { label: "DSA + DSA Lab", value: 79.8, color: "#ff9800" },
    { label: "Yoga", value: 92.0, color: "#18b8b2" },
  ],
};

export const lowAttendanceSubjects = {
  title: "Low Attendance Subjects",
  subtitle: "Below 77%",
  segments: [
    { label: "Applied Chem Lab 2", value: 65.2, color: "#ff5c5c" },
    { label: "India Constitution 2", value: 70.1, color: "#ff9800" },
    { label: "DSA Lab 2", value: 72.4, color: "#3c4758" },
    { label: "Math Lab 2", value: 73.5, color: "#2f80ed" },
    { label: "WAP Lab 2", value: 74.2, color: "#18b8b2" },
  ],
};

export const todaysClasses = {
  title: "Today's Classes",
  subtitle: "Monday",
  items: [
    { time: "09:00 AM", subject: "Prob. & Stat.", status: "Completed" },
    { time: "10:00 AM", subject: "DSA", status: "Completed" },
    { time: "11:00 AM", subject: "India Constitution 2", status: "Upcoming" },
    { time: "12:00 PM", subject: "Applied Chem Lab 2", status: "Upcoming" },
    { time: "02:00 PM", subject: "P&S Lab 2", status: "Upcoming" },
  ],
};

export const bunkPlanner = {
  title: "Bunk Planner",
  subtitle: "Best Day to Take Leave",
  note: "Based on least impact to overall attendance",
  rows: [
    { day: "Monday", classes: 5, absent: "80.45%", change: "-1.90%" },
    { day: "Tuesday", classes: 5, absent: "80.45%", change: "-1.90%" },
    { day: "Wednesday", classes: 5, absent: "80.81%", change: "-1.54%" },
    { day: "Thursday", classes: 5, absent: "80.81%", change: "-1.54%" },
    { day: "Friday", classes: 1, absent: "81.87%", change: "-0.48%", highlight: true },
  ],
  summary: "Best day to bunk: Friday (least impact)",
};

export const leaveScenario = {
  title: "One-Class Leave Scenario",
  subtitle: "For Today (Monday)",
  scenarios: [
    {
      label: "Attend All Classes",
      description: "If you attend all 5 classes",
      value: "83.49%",
      ratio: "174 / 213",
      tone: "green",
    },
    {
      label: "Leave 1 Class",
      description: "If you leave any 1 class",
      value: "82.55%",
      ratio: "173 / 213",
      tone: "amber",
    },
  ],
};

export const subjectWiseAttendance = {
  title: "Subject-wise Attendance",
  rows: [
    {
      subject: "Applied Chem",
      color: "#7c4dff",
      attended: 31,
      total: 40,
      percentage: "77.50%",
      needed: 0,
      bunks: 2,
      progress: 77.5,
    },
    {
      subject: "Applied Chem Lab 2",
      color: "#ff5c5c",
      attended: 15,
      total: 23,
      percentage: "65.22%",
      needed: 5,
      bunks: 0,
      progress: 65.22,
    },
    {
      subject: "English",
      color: "#2f80ed",
      attended: 18,
      total: 23,
      percentage: "78.26%",
      needed: 0,
      bunks: 1,
      progress: 78.26,
    },
    {
      subject: "Prob. & Stat.",
      color: "#1db954",
      attended: 32,
      total: 40,
      percentage: "80.00%",
      needed: 0,
      bunks: 3,
      progress: 80,
    },
    {
      subject: "P&S Lab 2",
      color: "#ff9800",
      attended: 25,
      total: 34,
      percentage: "73.53%",
      needed: 2,
      bunks: 0,
      progress: 73.53,
    },
  ],
};

export const assignmentsSolver = {
  title: "Assignments Solver",
  badge: "New",
  subtitle: "AI-powered help for your assignments",
  completed: 12,
  total: 18,
  items: [
    { label: "DSA Assignments", value: "4 / 5", progress: 80, color: "#1db954" },
    { label: "WAP Assignments", value: "3 / 4", progress: 75, color: "#2f80ed" },
    { label: "Math Assignments", value: "2 / 3", progress: 66.7, color: "#ff9800" },
    { label: "Chemistry Assignments", value: "3 / 6", progress: 50, color: "#ff5c5c" },
  ],
};
