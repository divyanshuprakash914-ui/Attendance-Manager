import { Routes, Route} from "react-router-dom";

import BeforeLogin from "./Components/Before_Login/Before_Login";
import Login from "./Components/Login_Page/Login";
import CreateAccount from "./Components/Create_Account/CreateAccount";
import Dashboard from "./Components/Dashboard/Dashboard";
import SettingsPage from "./Components/Settings_Page/SettingsPage";


function App() {

  return (
    <>
      <Routes>
        <Route path = "/" element={<BeforeLogin />} />
        <Route path = "/login" element={<Login />} />
        <Route path = "/create-account" element={<CreateAccount />} />
        <Route path = "/dashboard" element={<Dashboard />} />
        <Route path = "/dashboard/settings" element={<SettingsPage />} />
      </Routes>
      {/* <Login /> */}
    </>
  )
}

export default App
