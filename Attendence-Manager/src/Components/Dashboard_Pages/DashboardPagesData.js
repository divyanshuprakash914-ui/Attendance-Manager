export const subjectsPageData = {
  stats: [
    {
      icon: "book-open",
      title: "Tracked Subjects",
      value: "10",
      subtitle: "6 theory + 4 labs",
      accent: "purple",
    },
    {
      icon: "attendance-card",
      title: "Average Subject Score",
      value: "74.8%",
      subtitle: "Weighted course average",
      accent: "green",
      progress: 74.8,
    },
    {
      icon: "needed",
      title: "Recovery Needed",
      value: "4",
      subtitle: "Subjects need catch-up",
      accent: "red",
    },
    {
      icon: "bunks",
      title: "Safe Bunk Subjects",
      value: "2",
      subtitle: "Can afford absences",
      accent: "blue",
      emphasized: true,
    },
  ],
  groups: {
    title: "Attendance by subject stream",
    bars: [
      { label: "Core CS", value: 84.4, color: "#7c4dff" },
      { label: "Labs", value: 72.2, color: "#2f80ed" },
      { label: "Math Block", value: 78.1, color: "#1db954" },
      { label: "Communication", value: 81.6, color: "#ff9800" },
      { label: "Wellness", value: 92.0, color: "#18b8b2" },
    ],
  },
  lowSubjects: {
    title: "Subjects that need attention",
    subtitle: "The riskiest subjects for this cycle",
    segments: [
      { label: "Applied Chem Lab 2", value: 65.2, color: "#ff5c5c" },
      { label: "DSA Lab 2", value: 66.7, color: "#3c4758" },
      { label: "WAP Lab 2", value: 72.7, color: "#2f80ed" },
      { label: "India Constitution 2", value: 60.0, color: "#ff9800" },
    ],
  },
  spotlightTable: {
    title: "Priority subjects",
    subtitle: "Full subject section for the current cycle",
    columns: ["Subject", "Current", "Status", "Next move"],
    rows: [
      {
        key: "applied-chem-lab-2",
        highlight: true,
        cells: [
          {
            kind: "subject",
            label: "Applied Chem Lab 2",
            caption: "Lab stream",
            dotColor: "#ff5c5c",
          },
          {
            label: "65.2%",
            caption: "15 / 23 attended",
          },
          {
            kind: "badge",
            label: "Need 5 classes",
            caption: "Below threshold",
            tone: "red",
          },
          {
            label: "Protect next two labs",
            caption: "No leave around lab blocks",
          },
        ],
      },
      {
        key: "india-constitution-2",
        cells: [
          {
            kind: "subject",
            label: "India Constitution 2",
            caption: "Theory stream",
            dotColor: "#ff9800",
          },
          {
            label: "60.0%",
            caption: "6 / 10 attended",
          },
          {
            kind: "badge",
            label: "Need 8 classes",
            caption: "Most fragile theory subject",
            tone: "red",
          },
          {
            label: "Attend every upcoming lecture",
            caption: "Do not spend leave here",
          },
        ],
      },
      {
        key: "dsa-lab-2",
        cells: [
          {
            kind: "subject",
            label: "DSA Lab 2",
            caption: "Lab stream",
            dotColor: "#3c4758",
          },
          {
            label: "66.7%",
            caption: "16 / 24 attended",
          },
          {
            kind: "badge",
            label: "Need 11 classes",
            caption: "High recovery load",
            tone: "red",
          },
          {
            label: "Keep Wednesday protected",
            caption: "Treat as must-attend",
          },
        ],
      },
      {
        key: "yoga",
        cells: [
          {
            kind: "subject",
            label: "Yoga",
            caption: "Wellness stream",
            dotColor: "#18b8b2",
          },
          {
            label: "69.2%",
            caption: "18 / 26 attended",
          },
          {
            kind: "badge",
            label: "Need 9 classes",
            caption: "Below target",
            tone: "red",
          },
          {
            label: "Recover before considering Friday leave",
            caption: "Single-class days still matter here",
          },
        ],
      },
      {
        key: "wap-lab-2",
        cells: [
          {
            kind: "subject",
            label: "WAP Lab 2",
            caption: "Lab stream",
            dotColor: "#2f80ed",
          },
          {
            label: "72.7%",
            caption: "16 / 22 attended",
          },
          {
            kind: "badge",
            label: "Need 5 classes",
            caption: "Close to recovery",
            tone: "amber",
          },
          {
            label: "Hold full attendance",
            caption: "Skip no more sessions this week",
          },
        ],
      },
      {
        key: "wap",
        cells: [
          {
            kind: "subject",
            label: "WAP",
            caption: "Theory stream",
            dotColor: "#2f80ed",
          },
          {
            label: "72.0%",
            caption: "18 / 25 attended",
          },
          {
            kind: "badge",
            label: "Need 6 classes",
            caption: "Near recovery line",
            tone: "amber",
          },
          {
            label: "Stay full for the next week",
            caption: "Can stabilize quickly",
          },
        ],
      },
      {
        key: "applied-chem",
        cells: [
          {
            kind: "subject",
            label: "Applied Chem",
            caption: "Theory stream",
            dotColor: "#7c4dff",
          },
          {
            label: "85.0%",
            caption: "17 / 20 attended",
          },
          {
            kind: "badge",
            label: "Can bunk 2",
            caption: "Safe buffer",
            tone: "green",
          },
          {
            label: "Use only after labs stabilize",
            caption: "Best reserve subject",
          },
        ],
      },
      {
        key: "dsa",
        cells: [
          {
            kind: "subject",
            label: "DSA",
            caption: "Theory stream",
            dotColor: "#3c4758",
          },
          {
            label: "85.7%",
            caption: "18 / 21 attended",
          },
          {
            kind: "badge",
            label: "Can bunk 2",
            caption: "Safe buffer",
            tone: "green",
          },
          {
            label: "Use only if labs are protected first",
            caption: "Theory is healthy, lab is not",
          },
        ],
      },
      {
        key: "prob-stat",
        cells: [
          {
            kind: "subject",
            label: "Prob. & Stat.",
            caption: "Math stream",
            dotColor: "#1db954",
          },
          {
            label: "70.0%",
            caption: "21 / 30 attended",
          },
          {
            kind: "badge",
            label: "Need 10 classes",
            caption: "Needs steady recovery",
            tone: "red",
          },
          {
            label: "Avoid non-essential absences",
            caption: "Math block is still exposed",
          },
        ],
      },
      {
        key: "ps-lab-2",
        cells: [
          {
            kind: "subject",
            label: "P&S Lab 2",
            caption: "Lab stream",
            dotColor: "#18b8b2",
          },
          {
            label: "69.6%",
            caption: "16 / 23 attended",
          },
          {
            kind: "badge",
            label: "Need 8 classes",
            caption: "Below target",
            tone: "red",
          },
          {
            label: "Protect Thursday lab window",
            caption: "Lab recovery comes first",
          },
        ],
      },
    ],
  },
  weeklyLoad: {
    title: "Lecture load by week",
    subtitle: "Last 6 weeks",
    values: [18, 20, 17, 21, 16, 19],
    labels: ["W1", "W2", "W3", "W4", "W5", "W6"],
    insights: [
      { label: "Peak week", value: "W4 · 21 lectures" },
      { label: "Average", value: "18.5 per week" },
      { label: "Lightest", value: "W5 · 16 lectures" },
    ],
  },
  creditMix: {
    title: "Credit mix",
    subtitle: "Hours by subject family",
    centerLabel: "Hours",
    segments: [
      { label: "Core CS", value: 32, color: "#7c4dff" },
      { label: "Labs", value: 28, color: "#2f80ed" },
      { label: "Math", value: 18, color: "#1db954" },
      { label: "Humanities", value: 12, color: "#ff9800" },
      { label: "Wellness", value: 10, color: "#18b8b2" },
    ],
  },
  mentorQueue: {
    title: "Mentor checkpoints",
    subtitle: "Actions due before next review",
    items: [
      {
        label: "Applied Chem Lab 2",
        description: "Confirm the next two lab sessions stay protected in the weekly plan.",
        value: "Today",
        meta: "Critical",
        tone: "red",
      },
      {
        label: "DSA Lab 2",
        description: "Keep this lab non-bunkable until the subject climbs back over 72%.",
        value: "1 action",
        meta: "High risk",
        tone: "amber",
      },
      {
        label: "WAP Lab 2",
        description: "Recovery is possible if the next five sessions are attended without a break.",
        value: "5 sessions",
        meta: "Monitor",
        tone: "blue",
      },
    ],
  },
  guidance: {
    title: "Weekly guidance",
    summary: "Use only the healthiest theory subjects as buffers after lab recovery is protected.",
    bullets: [
      {
        label: "Protect labs first",
        text: "Applied Chem Lab 2 and DSA Lab 2 should stay untouched until the recovery line improves.",
      },
      {
        label: "Use theory selectively",
        text: "Only Applied Chem and DSA can absorb a controlled leave without causing immediate drift.",
      },
      {
        label: "Review before Friday",
        text: "Check the bunk planner once the next two lab sessions are marked present.",
      },
    ],
    actionLabel: "Review with bunk planner",
    actionPath: "/dashboard/bunk-planner",
  },
};

export const timetablePageData = {
  header: {
    icon: "calendar",
    eyebrow: "Timetable",
    title: "Weekly timetable",
    description: "See the current class rhythm, heavy days, and the cleaner windows you can still use this week.",
    chips: ["5-day view", "3 labs"],
  },
  stats: [
    {
      icon: "classes",
      title: "Classes This Week",
      value: "25",
      subtitle: "Across five active days",
      accent: "purple",
    },
    {
      icon: "calendar",
      title: "Lab Blocks",
      value: "4",
      subtitle: "Longest sessions on Wed/Fri",
      accent: "blue",
    },
    {
      icon: "trend",
      title: "Heavy Day",
      value: "Wednesday",
      subtitle: "6 scheduled sessions",
      accent: "amber",
    },
    {
      icon: "bunks",
      title: "Free Windows",
      value: "3",
      subtitle: "Use for faculty follow-up",
      accent: "green",
    },
  ],
  schedule: {
    title: "Week board",
    subtitle: "A quick view of your next five days",
    days: [
      {
        label: "Monday",
        summary: "5 sessions",
        blocks: [
          { subject: "Prob. & Stat.", time: "09:00 AM", meta: "Room A-203", tone: "purple" },
          { subject: "DSA", time: "10:30 AM", meta: "Room B-105", tone: "green" },
          { subject: "Applied Chem Lab", time: "02:15 PM", meta: "Lab 2", tone: "amber" },
        ],
      },
      {
        label: "Tuesday",
        summary: "4 sessions",
        blocks: [
          { subject: "WAP", time: "09:00 AM", meta: "Room C-112", tone: "blue" },
          { subject: "English", time: "11:00 AM", meta: "Seminar 4", tone: "green" },
          { subject: "Tutorial", time: "03:00 PM", meta: "Mentor hour", tone: "purple" },
        ],
      },
      {
        label: "Wednesday",
        summary: "6 sessions",
        blocks: [
          { subject: "DSA Lab", time: "08:30 AM", meta: "Lab 5", tone: "red" },
          { subject: "Math", time: "12:00 PM", meta: "Room A-108", tone: "green" },
          { subject: "WAP Lab", time: "02:30 PM", meta: "Lab 4", tone: "blue" },
        ],
      },
      {
        label: "Thursday",
        summary: "5 sessions",
        blocks: [
          { subject: "Applied Chem", time: "09:00 AM", meta: "Room B-204", tone: "amber" },
          { subject: "P&S Lab", time: "01:30 PM", meta: "Lab 1", tone: "red" },
          { subject: "English", time: "03:45 PM", meta: "Seminar 2", tone: "green" },
        ],
      },
      {
        label: "Friday",
        summary: "3 sessions",
        blocks: [
          { subject: "Yoga", time: "08:00 AM", meta: "Wellness court", tone: "teal" },
          { subject: "India Constitution", time: "11:30 AM", meta: "Room D-201", tone: "purple" },
        ],
      },
    ],
  },
  dayLoad: {
    title: "Daily load",
    subtitle: "Sessions per day",
    values: [5, 4, 6, 5, 3, 2],
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  },
  nextWindows: {
    title: "Use these lighter windows",
    subtitle: "Ideal slots for reviews or leave requests",
    items: [
      {
        label: "Friday afternoon",
        description: "Only one morning class, then an open window for meetings.",
        value: "Low load",
        meta: "Recommended",
        tone: "green",
      },
      {
        label: "Tuesday 1:00 PM",
        description: "Between lecture blocks, enough time for mentor or assignment check-in.",
        value: "45 min",
        meta: "Flexible",
        tone: "blue",
      },
      {
        label: "Thursday end block",
        description: "Useful if a lab extension forces schedule reshuffling.",
        value: "Buffer",
        meta: "Keep open",
        tone: "amber",
      },
    ],
  },
  roomUsage: {
    title: "Classroom vs lab usage",
    subtitle: "By day",
    legend: [
      { label: "Classroom", color: "#18b8b2" },
      { label: "Lab", color: "#3c4758" },
    ],
    categories: [
      { label: "Monday / Week 1", verified: 4, pending: 1 },
      { label: "Tuesday / Week 1", verified: 3, pending: 1 },
      { label: "Wednesday / Week 1", verified: 3, pending: 3 },
      { label: "Thursday / Week 1", verified: 4, pending: 1 },
      { label: "Friday / Week 1", verified: 2, pending: 1 },
    ],
  },
  handoffTable: {
    title: "Upcoming swaps and handoffs",
    subtitle: "Potential timetable changes to watch",
    columns: ["Block", "Reason", "Impact", "Owner"],
    rows: [
      { key: "chem-lab", highlight: true, cells: ["Thu 1:30 PM", "Chem lab stretch", "High", "Applied Chem Faculty"] },
      { key: "wap-lab", cells: ["Wed 2:30 PM", "Possible extra lab review", "Medium", "WAP Mentor"] },
      { key: "yoga", cells: ["Fri 8:00 AM", "Weather contingency", "Low", "Wellness Office"] },
    ],
  },
};

export const attendancePageData = {
  header: {
    icon: "attendance",
    eyebrow: "Attendance",
    title: "Attendance overview",
    description: "Track trend, risk, and recovery in one place without opening every subject separately.",
    chips: ["72.8% current", "4 at risk"],
  },
  stats: [
    {
      icon: "attendance-card",
      title: "Current Attendance",
      value: "72.77%",
      subtitle: "171 / 235 verified",
      accent: "purple",
      progress: 72.77,
    },
    {
      icon: "needed",
      title: "Gap To Threshold",
      value: "4.23%",
      subtitle: "Needed to reach 77%",
      accent: "red",
    },
    {
      icon: "trend",
      title: "7-Day Stability",
      value: "5 days",
      subtitle: "No new drops this week",
      accent: "green",
    },
    {
      icon: "bunks",
      title: "Safe Leave Windows",
      value: "2",
      subtitle: "Low-impact opportunities",
      accent: "blue",
    },
  ],
  trend: {
    title: "Attendance trend",
    subtitle: "Last 8 weeks",
    legend: "Verified attendance %",
    labels: ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"],
    values: [68.4, 69.2, 70.1, 70.8, 71.6, 72.0, 72.5, 72.8],
  },
  groups: {
    title: "Group performance",
    bars: [
      { label: "Core CS", value: 78.6, color: "#7c4dff" },
      { label: "Labs", value: 69.7, color: "#2f80ed" },
      { label: "Math", value: 74.8, color: "#1db954" },
      { label: "Communication", value: 81.0, color: "#ff9800" },
      { label: "Wellness", value: 92.0, color: "#18b8b2" },
    ],
  },
  lowSubjects: {
    title: "Low attendance watchlist",
    subtitle: "Subjects most likely to trigger alerts",
    segments: [
      { label: "India Constitution 2", value: 60.0, color: "#ff5c5c" },
      { label: "Applied Chem Lab 2", value: 65.2, color: "#ff9800" },
      { label: "DSA Lab 2", value: 66.7, color: "#3c4758" },
      { label: "Yoga", value: 69.2, color: "#2f80ed" },
    ],
  },
  compliance: {
    title: "Weekly verified sessions",
    subtitle: "Last 6 closes",
    values: [32, 35, 37, 38, 40, 42],
    labels: ["W1", "W2", "W3", "W4", "W5", "W6"],
  },
  recoveryTable: {
    title: "Recovery queue",
    subtitle: "What needs attendance protection now",
    columns: ["Subject", "Now", "Recovery", "Guardrail"],
    rows: [
      { key: "const", highlight: true, cells: ["India Constitution 2", "60.0%", "Need 8 classes", "No leave until next review"] },
      { key: "chem-lab", cells: ["Applied Chem Lab 2", "65.2%", "Need 5 classes", "Protect next two lab sessions"] },
      { key: "dsa-lab", cells: ["DSA Lab 2", "66.7%", "Need 11 classes", "Mark as must-attend"] },
      { key: "yoga", cells: ["Yoga", "69.2%", "Need 9 classes", "Only safe to skip after recovery"] },
    ],
  },
  signals: {
    title: "Recent signals",
    subtitle: "Why the score changed this week",
    items: [
      {
        label: "Chem lab drop",
        description: "One missed lab reduced the rolling average more than two theory absences.",
        value: "-1.2%",
        meta: "Yesterday",
        tone: "red",
      },
      {
        label: "Friday protection",
        description: "Single-class Friday is still the least harmful leave slot.",
        value: "Safe",
        meta: "Planner updated",
        tone: "green",
      },
      {
        label: "WAP stable",
        description: "WAP theory remained above threshold after full attendance this week.",
        value: "72.0%",
        meta: "Holding",
        tone: "blue",
      },
    ],
  },
};

export const bunkPlannerPageData = {
  header: {
    icon: "trend",
    eyebrow: "Bunk Planner",
    title: "Leave impact",
    description: "Compare day-level impact first, then use the safest window instead of guessing around your schedule.",
    chips: ["Friday safest", "2 protected labs"],
  },
  stats: [
    {
      icon: "bunks",
      title: "Best Leave Day",
      value: "Friday",
      subtitle: "Only 1 class scheduled",
      accent: "green",
    },
    {
      icon: "attendance-card",
      title: "Least Impact",
      value: "-0.43%",
      subtitle: "If Friday is missed",
      accent: "purple",
    },
    {
      icon: "needed",
      title: "Protected Blocks",
      value: "2",
      subtitle: "Avoid missing these",
      accent: "red",
    },
    {
      icon: "calendar",
      title: "Flexible Days",
      value: "2",
      subtitle: "Mon/Tue with planning",
      accent: "blue",
    },
  ],
  planner: {
    title: "Best Day to Take Leave",
    subtitle: "Overview of the lowest-impact options",
    note: "Ordered by fewer classes first, then higher residual attendance.",
    bestDay: "Friday",
    days: [
      { day: "Friday", classes: 1, percentage: 71.86, risk: "low" },
      { day: "Monday", classes: 5, percentage: 70.64, risk: "high" },
      { day: "Tuesday", classes: 5, percentage: 70.64, risk: "high" },
      { day: "Thursday", classes: 5, percentage: 70.64, risk: "high" },
    ],
  },
  scenario: {
    title: "One-class leave",
    day: "Monday",
    attendAll: {
      percentage: "72.77%",
      ratio: "171 / 235",
    },
    leaveOne: {
      percentage: "72.34%",
      ratio: "170 / 235",
    },
  },
  leaveWindows: {
    title: "Weekly leave impact",
    subtitle: "Residual attendance if a day is missed",
    values: [70.64, 70.64, 70.64, 70.64, 71.86, 72.2],
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Alt"],
  },
  protectedClasses: {
    title: "Protected classes",
    subtitle: "Do not trade these on a leave request",
    items: [
      {
        label: "DSA Lab 2",
        description: "Missing another lab pushes the subject deeper below threshold.",
        value: "Critical",
        meta: "Wed 8:30 AM",
        tone: "red",
      },
      {
        label: "Applied Chem Lab 2",
        description: "Needs full attendance across the next two meetings to recover.",
        value: "High",
        meta: "Thu 1:30 PM",
        tone: "amber",
      },
      {
        label: "India Constitution 2",
        description: "Already the weakest subject, so theory sessions must stay protected.",
        value: "Watch",
        meta: "Fri 11:30 AM",
        tone: "purple",
      },
    ],
  },
  scenarioMatrix: {
    title: "Scenario matrix",
    subtitle: "Fast comparison for leave planning",
    columns: ["Choice", "Classes Missed", "Result", "Use when"],
    rows: [
      { key: "fri", highlight: true, cells: ["Friday", "1", "71.86%", "Need a low-impact break"] },
      { key: "one", cells: ["Leave one class", "1", "72.34%", "Only one session needs skipping"] },
      { key: "monday", cells: ["Miss Monday", "5", "70.64%", "Emergency only"] },
    ],
  },
};

export const reportsPageData = {
  header: {
    icon: "report",
    eyebrow: "Reports",
    title: "Reports and exports",
    description: "Review what gets generated, where it goes, and which report deliveries still need a final check.",
    chips: ["18 exports", "2 pending review"],
  },
  stats: [
    {
      icon: "report",
      title: "Exports This Week",
      value: "18",
      subtitle: "Across faculty and mentors",
      accent: "purple",
    },
    {
      icon: "chart",
      title: "Delivery Rate",
      value: "94%",
      subtitle: "Automated reports delivered",
      accent: "green",
      progress: 94,
    },
    {
      icon: "bell",
      title: "Pending Review",
      value: "2",
      subtitle: "Need manual confirmation",
      accent: "amber",
    },
    {
      icon: "users",
      title: "Covered Sections",
      value: "11",
      subtitle: "Included in current report pack",
      accent: "blue",
    },
  ],
  reportMix: {
    title: "Report mix",
    subtitle: "Weekly export demand by type",
    legend: [
      { label: "Scheduled", color: "#18b8b2" },
      { label: "Manual", color: "#3c4758" },
    ],
    categories: [
      { label: "Section / Snapshot", verified: 12, pending: 4 },
      { label: "Subject / Deep dive", verified: 8, pending: 5 },
      { label: "Mentor / Review", verified: 6, pending: 2 },
      { label: "Parent / Summary", verified: 5, pending: 1 },
      { label: "Admin / Audit", verified: 4, pending: 1 },
    ],
  },
  reportDistribution: {
    title: "Delivery distribution",
    subtitle: "Where reports are going",
    centerLabel: "Shares",
    segments: [
      { label: "Faculty mail", value: 34, color: "#7c4dff" },
      { label: "Mentor summary", value: 26, color: "#2f80ed" },
      { label: "Admin audit", value: 18, color: "#1db954" },
      { label: "Parent digest", value: 14, color: "#ff9800" },
      { label: "Manual export", value: 8, color: "#18b8b2" },
    ],
  },
  exportHistory: {
    title: "Monthly export volume",
    subtitle: "Last 6 closes",
    values: [11, 14, 17, 16, 18, 22],
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  },
  exportTable: {
    title: "Latest exports",
    subtitle: "Most recent generated files",
    columns: ["Name", "Audience", "Status", "Updated"],
    rows: [
      { key: "sec-a", highlight: true, cells: ["Section A weekly summary", "Mentor", "Delivered", "10:42 AM"] },
      { key: "chem-risk", cells: ["Chem lab risk digest", "Faculty", "Pending", "09:55 AM"] },
      { key: "parent", cells: ["Parent attendance digest", "Parents", "Delivered", "Yesterday"] },
      { key: "audit", cells: ["Admin variance audit", "Admin", "Review", "Yesterday"] },
    ],
  },
  schedules: {
    title: "Scheduled deliveries",
    subtitle: "Reports that will trigger automatically",
    items: [
      {
        label: "Monday mentor pack",
        description: "Rolls up all subjects below the weekly threshold.",
        value: "08:00 AM",
        meta: "Active",
        tone: "purple",
      },
      {
        label: "Friday parent digest",
        description: "Sends only if a subject remains under the recovery line.",
        value: "06:30 PM",
        meta: "Conditional",
        tone: "amber",
      },
      {
        label: "Daily admin variance audit",
        description: "Flags missing faculty updates before the next morning.",
        value: "09:00 PM",
        meta: "Active",
        tone: "green",
      },
    ],
  },
};

export const alertsPageData = {
  header: {
    icon: "bell",
    eyebrow: "Alerts",
    title: "Alert center",
    description: "Keep the active signals visible, understand severity fast, and see who already owns the next response.",
    chips: ["9 active", "3 critical"],
  },
  stats: [
    {
      icon: "bell",
      title: "Open Alerts",
      value: "9",
      subtitle: "Across all sections",
      accent: "purple",
    },
    {
      icon: "needed",
      title: "Critical",
      value: "3",
      subtitle: "Immediate follow-up needed",
      accent: "red",
    },
    {
      icon: "check",
      title: "Resolved Today",
      value: "5",
      subtitle: "Closed by mentors/faculty",
      accent: "green",
    },
    {
      icon: "users",
      title: "Escalated",
      value: "2",
      subtitle: "Waiting on senior review",
      accent: "amber",
    },
  ],
  severityMix: {
    title: "Severity mix",
    subtitle: "Current open alerts",
    centerLabel: "Open",
    segments: [
      { label: "Critical", value: 3, color: "#ff5c5c" },
      { label: "High", value: 2, color: "#ff9800" },
      { label: "Medium", value: 3, color: "#2f80ed" },
      { label: "Low", value: 1, color: "#18b8b2" },
    ],
  },
  alertVolume: {
    title: "Alerts raised this week",
    subtitle: "Daily volume",
    values: [2, 4, 3, 6, 5, 4],
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  },
  liveAlerts: {
    title: "Live alerts",
    subtitle: "What currently needs attention",
    items: [
      {
        label: "Applied Chem Lab 2 threshold breach",
        description: "Student attendance dropped below the protected band after one missed lab.",
        value: "Critical",
        meta: "Faculty owner assigned",
        tone: "red",
      },
      {
        label: "WAP Lab 2 recovery window",
        description: "Needs five clean sessions to move back into the safe zone.",
        value: "High",
        meta: "Mentor review pending",
        tone: "amber",
      },
      {
        label: "Friday attendance anomaly",
        description: "One class showed delayed marking from faculty upload.",
        value: "Medium",
        meta: "Auto-check running",
        tone: "blue",
      },
    ],
  },
  automationTable: {
    title: "Automation rules",
    subtitle: "What the system will do next",
    columns: ["Rule", "Trigger", "Owner", "Status"],
    rows: [
      { key: "lab-drop", highlight: true, cells: ["Lab threshold breach", "< 70%", "Faculty + Mentor", "Active"] },
      { key: "weekly-risk", cells: ["Weekly risk digest", "2+ low subjects", "Mentor", "Queued"] },
      { key: "late-marking", cells: ["Late attendance update", "Unverified after 9 PM", "Admin", "Active"] },
    ],
  },
  escalationPath: {
    title: "Escalation path",
    subtitle: "How critical alerts move",
    items: [
      {
        label: "Faculty owner",
        description: "First review checks whether the marking or attendance gap is genuine.",
        value: "Step 1",
        meta: "Within 4 hours",
        tone: "purple",
      },
      {
        label: "Mentor escalation",
        description: "If two consecutive sessions remain unresolved, it moves to mentor review.",
        value: "Step 2",
        meta: "Same day",
        tone: "blue",
      },
      {
        label: "Admin audit",
        description: "Used only for repeated discrepancies or missing updates across sections.",
        value: "Step 3",
        meta: "Escalate only when needed",
        tone: "green",
      },
    ],
  },
};

export const leaveTrackerPageData = {
  header: {
    icon: "leave",
    eyebrow: "Leave Tracker",
    title: "Leave tracker",
    description: "Keep requests, approvals, and attendance impact in one calmer view before anything gets scheduled.",
    chips: ["4 pending", "2 approved"],
  },
  stats: [
    {
      icon: "leave",
      title: "Pending Requests",
      value: "4",
      subtitle: "Waiting for faculty decision",
      accent: "purple",
    },
    {
      icon: "check",
      title: "Approved This Week",
      value: "2",
      subtitle: "Already scheduled",
      accent: "green",
    },
    {
      icon: "attendance-card",
      title: "Avg Impact",
      value: "-0.54%",
      subtitle: "Per approved leave",
      accent: "amber",
    },
    {
      icon: "bell",
      title: "Conflicts",
      value: "1",
      subtitle: "Needs a timetable change",
      accent: "red",
    },
  ],
  leaveFlow: {
    title: "Requests by week",
    subtitle: "Pending vs approved trend",
    values: [1, 2, 3, 2, 4, 3],
    labels: ["W1", "W2", "W3", "W4", "W5", "W6"],
  },
  reasonMix: {
    title: "Leave reason mix",
    subtitle: "Current semester",
    centerLabel: "Requests",
    segments: [
      { label: "Medical", value: 28, color: "#7c4dff" },
      { label: "Personal", value: 24, color: "#2f80ed" },
      { label: "Travel", value: 16, color: "#1db954" },
      { label: "Event", value: 18, color: "#ff9800" },
      { label: "Other", value: 14, color: "#18b8b2" },
    ],
  },
  requestTable: {
    title: "Recent requests",
    subtitle: "Requests and their likely impact",
    columns: ["Day", "Subject impact", "Decision", "Note"],
    rows: [
      { key: "fri", highlight: true, cells: ["Friday", "Low", "Recommended", "Single-class day"] },
      { key: "thu", cells: ["Thursday", "Medium", "Review", "Chem lab risk"] },
      { key: "wed", cells: ["Wednesday", "High", "Avoid", "Two protected labs"] },
      { key: "mon", cells: ["Monday", "High", "Emergency only", "Full lecture stack"] },
    ],
  },
  upcomingApprovals: {
    title: "Upcoming approved leave",
    subtitle: "Already cleared and scheduled",
    items: [
      {
        label: "Friday half-day request",
        description: "Approved because only a single low-risk class is affected.",
        value: "May 30",
        meta: "Safe",
        tone: "green",
      },
      {
        label: "Tutorial swap request",
        description: "Shifted into Tuesday flexible window to avoid attendance loss.",
        value: "Jun 3",
        meta: "Adjusted",
        tone: "blue",
      },
      {
        label: "Chem lab review hold",
        description: "Kept pending until attendance moves out of the danger band.",
        value: "Hold",
        meta: "Blocked",
        tone: "amber",
      },
    ],
  },
  conflictNotes: {
    title: "Conflict notes",
    subtitle: "What planners should watch",
    items: [
      {
        label: "Wednesday labs",
        description: "No leave should overlap DSA Lab 2 or WAP Lab 2 until both recover.",
        value: "Hard stop",
        meta: "Priority 1",
        tone: "red",
      },
      {
        label: "Friday window",
        description: "Still safe, but only while the single class stays above threshold.",
        value: "Monitor",
        meta: "Review weekly",
        tone: "green",
      },
    ],
  },
};

export const assignmentsSolverPageData = {
  header: {
    icon: "spark",
    eyebrow: "Assignments Solver",
    title: "Assignments",
    description: "Review the current workload, what is due first, and which tasks deserve attention before heavy class days.",
    chips: ["18 tasks", "6 due this week"],
  },
  stats: [
    {
      icon: "spark",
      title: "Open Tasks",
      value: "18",
      subtitle: "Across five subjects",
      accent: "purple",
    },
    {
      icon: "calendar",
      title: "Due This Week",
      value: "6",
      subtitle: "Two need immediate action",
      accent: "red",
    },
    {
      icon: "check",
      title: "Completed",
      value: "12",
      subtitle: "67% closed already",
      accent: "green",
      progress: 67,
    },
    {
      icon: "trend",
      title: "Longest Queue",
      value: "DSA",
      subtitle: "4 / 5 still open",
      accent: "amber",
    },
  ],
  solverCard: {
    title: "Assignments Solver",
    badge: "New",
    subtitle: "AI-assisted view of the current workload",
    completed: 12,
    total: 18,
    items: [
      { label: "DSA Assignments", value: "4 / 5", progress: 80, color: "#1db954" },
      { label: "WAP Assignments", value: "3 / 4", progress: 75, color: "#2f80ed" },
      { label: "Math Assignments", value: "2 / 3", progress: 66.7, color: "#ff9800" },
      { label: "Chemistry Assignments", value: "3 / 6", progress: 50, color: "#ff5c5c" },
    ],
  },
  dueLoad: {
    title: "Due load this week",
    subtitle: "Tasks landing by day",
    values: [1, 2, 1, 3, 2, 1],
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  },
  subjectSplit: {
    title: "Work split by subject",
    subtitle: "Open items by stream",
    centerLabel: "Tasks",
    segments: [
      { label: "DSA", value: 5, color: "#7c4dff" },
      { label: "WAP", value: 4, color: "#2f80ed" },
      { label: "Math", value: 3, color: "#1db954" },
      { label: "Chemistry", value: 3, color: "#ff9800" },
      { label: "English", value: 3, color: "#18b8b2" },
    ],
  },
  priorityQueue: {
    title: "Priority queue",
    subtitle: "Tackle these first",
    columns: ["Assignment", "Why now", "ETA", "Next move"],
    rows: [
      { key: "dsa-lab", highlight: true, cells: ["DSA Lab 2 sheet", "Lab review tomorrow", "45 min", "Solve first"] },
      { key: "chem", cells: ["Applied Chem write-up", "Pairs with low attendance lab", "30 min", "Complete before Thu"] },
      { key: "wap", cells: ["WAP mini project", "Needs mentor review", "60 min", "Prep draft"] },
      { key: "math", cells: ["Math tutorial set", "Short but due soon", "25 min", "Clear tonight"] },
    ],
  },
  suggestions: {
    title: "AI suggestions",
    subtitle: "Where the solver should help next",
    items: [
      {
        label: "Draft DSA lab skeleton",
        description: "Start with the highest-risk subject so tomorrow's lab attendance stays protected.",
        value: "Top pick",
        meta: "Use now",
        tone: "purple",
      },
      {
        label: "Bundle short theory tasks",
        description: "Clear English and Math in one focused session during Tuesday's lighter window.",
        value: "30 mins",
        meta: "Efficient",
        tone: "green",
      },
      {
        label: "Keep Thursday light",
        description: "Avoid overloading the day that already includes the protected chem lab.",
        value: "Guardrail",
        meta: "Planning",
        tone: "amber",
      },
    ],
  },
};
