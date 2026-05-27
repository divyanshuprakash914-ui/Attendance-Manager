import { Routes, Route} from "react-router-dom";

import BeforeLogin from "./Components/Before_Login/Before_Login";
import Login from "./Components/Login_Page/Login";
import CreateAccount from "./Components/Create_Account/CreateAccount";
import Dashboard from "./Components/Dashboard/Dashboard";
import SettingsPage from "./Components/Settings_Page/SettingsPage";
import SubjectsPage from "./Components/Dashboard_Pages/pages/SubjectsPage";
import TimetablePage from "./Components/Dashboard_Pages/pages/TimetablePage";
import AttendancePage from "./Components/Dashboard_Pages/pages/AttendancePage";
import BunkPlannerPage from "./Components/Dashboard_Pages/pages/BunkPlannerPage";
import ReportsPage from "./Components/Dashboard_Pages/pages/ReportsPage";
import AlertsPage from "./Components/Dashboard_Pages/pages/AlertsPage";
import LeaveTrackerPage from "./Components/Dashboard_Pages/pages/LeaveTrackerPage";
import AssignmentsSolverPage from "./Components/Dashboard_Pages/pages/AssignmentsSolverPage";


function App() {

  return (
    <>
      <Routes>
        <Route path = "/" element={<BeforeLogin />} />
        <Route path = "/login" element={<Login />} />
        <Route path = "/create-account" element={<CreateAccount />} />
        <Route path = "/dashboard" element={<Dashboard />} />
        <Route path = "/dashboard/subjects" element={<SubjectsPage />} />
        <Route path = "/dashboard/timetable" element={<TimetablePage />} />
        <Route path = "/dashboard/attendance" element={<AttendancePage />} />
        <Route path = "/dashboard/bunk-planner" element={<BunkPlannerPage />} />
        <Route path = "/dashboard/reports" element={<ReportsPage />} />
        <Route path = "/dashboard/alerts" element={<AlertsPage />} />
        <Route path = "/dashboard/leave-tracker" element={<LeaveTrackerPage />} />
        <Route path = "/dashboard/assignments-solver" element={<AssignmentsSolverPage />} />
        <Route path = "/dashboard/settings" element={<SettingsPage />} />
      </Routes>
      {/* <Login /> */}
    </>
  )
}

export default App
