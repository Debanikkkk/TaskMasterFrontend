import { Rocket, Monitor, Zap, Heart, Smartphone, Package, Cake, BarChart2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import styles from "./Dashboard.module.css";
import WorkspaceCard from "../Workspacecard/WorkspaceCard";

import {
  createWorkspace,
} from "../../redux/slices/workspaceSlice";

const LUCIDE_ICONS = [
  { name: "Rocket", value: "Rocket", component: Rocket },
  { name: "Monitor", value: "Monitor", component: Monitor },
  { name: "Zap", value: "Zap", component: Zap },
  { name: "Heart", value: "Heart", component: Heart },
  { name: "Smartphone", value: "Smartphone", component: Smartphone },
  { name: "Package", value: "Package", component: Package },
  { name: "Cake", value: "Cake", component: Cake },
  { name: "BarChart2", value: "BarChart2", component: BarChart2 },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { workspaces, loading, error } = useSelector(
    (state) => state.workspaces
  );

  const { tasks } = useSelector(
    (state) => state.tasks
  );

  const handleOpenWorkspace = (workspaceId) => {
    navigate(`/workspace/${workspaceId}`);
  };

  const handleCreateWorkspace = async ({
    title,
    description,
    iconBg,
    icon,
  }) => {
    try {
      await dispatch(
        createWorkspace({
          icon: icon || "Rocket",
          iconBg,
          title,
          description:
            description || "A new TaskMaster workspace",
        })
      ).unwrap();
    } catch (error) {
      console.error("Failed to create workspace:", error);
    }
  };

  const getWorkspaceTaskCount = (workspaceId) => {
    return tasks.filter(
      (task) => task.workspaceId === workspaceId
    ).length;
  };

  return (
    <div className={styles.page}>
      <Sidebar workspaces={workspaces} />

      <div className={styles.main}>
        <Header
          onCreateWorkspace={handleCreateWorkspace}
        />

        <div className={styles.content}>
          {loading && workspaces.length === 0 && (
            <div className={styles.emptyState}>
              Loading workspaces...
            </div>
          )}

          {error && (
            <div className={styles.emptyState}>
              Failed to load workspaces: {error}
            </div>
          )}

          <div className={styles.workspaceGrid}>
            {workspaces.map((workspace) => (
              <WorkspaceCard
                key={workspace.id}
                {...workspace}
                tasks={getWorkspaceTaskCount(workspace.id)}
                workspaceId={workspace.id}
                onOpen={() =>
                  handleOpenWorkspace(workspace.id)
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;