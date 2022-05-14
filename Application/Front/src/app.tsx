import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "mobx-react";
import store from "./stores/mainStore";
import MainPage from "./pages/main/main";
import Login from "./pages/login/login";
import Registration from "./pages/registration/registration";

const App = () => (
  <Router>
    <Provider {...store}>
      <Routes>
        <Route path="signin" element={<Login />} />
        <Route path="signup" element={<Registration />} />
        <Route path="*" element={<MainPage />} />
      </Routes>
    </Provider>
  </Router>
);

export default App;
