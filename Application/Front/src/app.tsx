import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "mobx-react";
import store from "./stores/mainStore";
import MainPage from "./pages/main/main";

const App = () => (
  <Router>
    <Provider {...store}>
      <Routes>
        <Route path="*" element={<MainPage />} />
      </Routes>
    </Provider>
  </Router>
);

export default App;
