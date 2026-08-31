import { useState } from "react";
import { Rocket, Monitor,  Zap, Heart, Smartphone, Package, Cake, BarChart2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import styles from "./Dashboard.module.css";
import WorkspaceCard from "../Workspacecard/WorkspaceCard";

// Lucide icon names matching SpringBoot API (backend expects these exact component names)
const LUCIDE_ICONS = [
  { name: "Rocket", value: "Rocket", component: Rocket },
  { name: "Monitor", value: "Monitor", component: Monitor },
  // { name: "Github", value: "Github", component: Github },
  { name: "Zap", value: "Zap", component: Zap },
  { name: "Heart", value: "Heart", component: Heart },
  { name: "Smartphone", value: "Smartphone", component: Smartphone },
  { name: "Package", value: "Package", component: Package },
  { name: "Cake", value: "Cake", component: Cake },
  { name: "BarChart2", value: "BarChart2", component: BarChart2 },
  // { name: "Chess", value: "Chess", component: Chess }
];

// Map icon name string to actual component
const getIconComponent = (iconName) => {
  const iconMap = LUCIDE_ICONS.reduce((acc, { name, component }) => {
    acc[name] = component;
    return acc;
  }, {});
  return iconMap[iconName] || Rocket;
};

// Map icon name to display label for tooltips/labels
const getIconLabel = (iconName) => {
  const iconMap = LUCIDE_ICONS.reduce((acc, { name, value }) => {
    acc[value] = name.charAt(0).toUpperCase() + name.slice(1);
    return acc;
  }, {});
  return iconMap[iconName] || iconName;
};

const Dashboard = ({ workspaces, setWorkspaces, tasks }) => {
  const navigate = useNavigate();

  const handleOpenWorkspace = (workspaceId) => {
    navigate(`/workspace/${workspaceId}`);
  };

  const handleCreateWorkspace = ({ title, description, iconBg, icon }) => {
    console.log("Creating workspace with SpringBoot API schema:", {
      id: Date.now(),
      icon: icon || "Rocket",  // Actual component name as expected by backend
      iconBg,
      title,
      description: description || "A new TaskMaster workspace"
    });
    
    const IconComponent = getIconComponent(icon);

    setWorkspaces((currentWorkspaces) => [
      ...currentWorkspaces,
      {
        id: Date.now(),
        icon: IconComponent,  // Component for React rendering
        iconLabel: getIconLabel(icon),  // String label if needed
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
                key={w.id || w.workspaceId}
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
