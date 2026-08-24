import { useState } from "react";
import { Rocket } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
// import WorkspaceCard from "../WorkspaceCard/WorkspaceCard";
import styles from "./Dashboard.module.css";
import WorkspaceCard from "../Workspacecard/WorkspaceCard";

const Dashboard = ({ workspaces, setWorkspaces, tasks }) => {
  const navigate = useNavigate();

  const handleOpenWorkspace = (workspaceId) => {
    navigate(`/workspace/${workspaceId}`);
  };

  const handleCreateWorkspace = ({ title, description, iconBg }) => {
    setWorkspaces((currentWorkspaces) => [
      ...currentWorkspaces,
      {
        id: Date.now(),
        icon: Rocket,
        iconBg,
        title,
        description,
        progress: 0,
        progressColor: iconBg,
        tasks: 0,
        bugs: 0,
        updatedText: "Created just now",
      },
    ]);
  };

  return (
    <div className={styles.page}>
      <Sidebar workspaces={workspaces} />

      <div className={styles.main}>
        <Header onCreateWorkspace={handleCreateWorkspace} />

        <div className={styles.content}>
          <div className={styles.workspaceGrid}>
            {workspaces.map((w) => (
              <WorkspaceCard
                key={w.id}
                {...w}
                tasks={tasks.filter((task) => task.workspaceId === w.id).length}
                workspaceId={w.id}
                onOpen={() => handleOpenWorkspace(w.id)}
              />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
