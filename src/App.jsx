import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import LoginPage from "./components/LoginPage/LoginPage";
import Dashboard from "./components/Dashboard/Dashboard";
import WorkspacePage from "./components/WorkspacePage/WorkspacePage";

import {
  fetchWorkspaces,
} from "./redux/slices/workspaceSlice";

import {
  fetchTasks,
} from "./redux/slices/taskSlice";
import RegisterPage from "./components/RegisterPage/RegisterPage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWorkspaces());
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<LoginPage />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/workspace/:workspaceId"
          element={<WorkspacePage />}
        />

        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;