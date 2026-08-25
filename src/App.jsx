import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage";
import Dashboard from "./components/Dashboard/Dashboard";
import WorkspacePage from "./components/WorkspacePage/WorkspacePage";
import { initialWorkspaces, tasks } from "./components/data";

function App() {
  const [workspaceState, setWorkspaceState] = useState(initialWorkspaces);
  const [taskState, setTaskState] = useState(tasks);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <Dashboard
              workspaces={workspaceState}
              setWorkspaces={setWorkspaceState}
              tasks={taskState}
            />
          }
        />
        <Route
          path="/workspace/:workspaceId"
          element={
            <WorkspacePage
              workspaces={workspaceState}
              tasks={taskState}
              setTasks={setTaskState}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;