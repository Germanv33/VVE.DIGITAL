import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "mobx-react";
import store from "./stores/mainStore";
import MainPage from "./pages/main/main";
import Login from "./pages/login/login";
import Registration from "./pages/registration/registration";
import { RequireToken } from "./utils/auth";
import Profile from "./pages/profile/profile";

const App = () => (
  <Router>
    <Provider {...store}>
      <Routes>
        {/* <RequireToken> */}
        <Route path="profile" element={<Profile />} />
        {/* </RequireToken> */}
        <Route path="signin" element={<Login />} />
        <Route path="signup" element={<Registration />} />
        <Route path="*" element={<MainPage />} />
      </Routes>
    </Provider>
  </Router>
);

export default App;
