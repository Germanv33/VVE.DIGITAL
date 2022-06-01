import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "mobx-react";
import store from "./stores/mainStore";
import MainPage from "./pages/main/main";
import Login from "./pages/login/login";
import Registration from "./pages/registration/registration";
// import { RequireToken } from "./utils/auth";
import Profile from "./pages/profile/profile";
import Worker_Registration from "./pages/registration_worker/registration";
import Worker_Login from "./pages/login_worker/login";
import { RequireToken } from "./utils/auth";
import WorkerProfile from "./pages/workerProfile/WorkerProfile";
import TeamPage from "./pages/devTeam/TeamPage";

const App = () => (
  <Router>
    <Provider {...store}>
      <Routes>
        {/* <RequireToken> */}
        <Route
          path="profile"
          element={
            <RequireToken>
              <Profile />
            </RequireToken>
          }
        />
        {/* </RequireToken> */}
        <Route path="signin" element={<Login />} />
        <Route path="signup" element={<Registration />} />
        <Route path="worker/signup" element={<Worker_Registration />} />
        <Route path="worker/signin" element={<Worker_Login />} />
        <Route path="worker/profile" element={<WorkerProfile />} />
        <Route path="devs/:team_id" element={<TeamPage />} />
        <Route path="*" element={<MainPage />} />
      </Routes>
    </Provider>
  </Router>
);

export default App;
