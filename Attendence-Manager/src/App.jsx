import { Routes, Route} from "react-router-dom";

import BeforeLogin from "./Components/Before_Login/Before_Login";
import Login from "./Components/Login_Page/Login";


function App() {

  return (
    <>
      <Routes>
        <Route path = "/" element={<BeforeLogin />} />
        <Route path = "/login" element={<Login />} />
      </Routes>
      {/* <Login /> */}
    </>
  )
}

export default App
