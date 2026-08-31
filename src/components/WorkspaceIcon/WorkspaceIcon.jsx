import { useEffect } from "react";
import styles from "../Header/Header.module.css";

/**
 * WorkspaceIcon Component
 * 
 * Renders the lucide icon based on the workspace icon name (e.g., "ROCKET", "MONITOR")
 * Matches the Workspace.entity.icon field from TaskMasterBackend
 */
const WorkspaceIcon = ({ icon, color }) => {
  // Common lucide icons mapping for display
  const iconMap = {
    ROCKET: "🚀",
    MONITOR: "💻",
    GITHUB: "🐱",
    ZAP: "⚡",
    HEART: "❤️",
    SMARTPHONE: "📱",
    PACKAGE: "📦",
    CAKE: "🎂",
    "BAR-chart-2": "📊",
    CHESS: "♟"
  };

  useEffect(() => {
    // Lazy load lucide icon if needed for full integration
    console.log("Workspace Icon:", { icon, color });
  }, [icon, color]);

  const initial = icon ? icon.split('-')[0].charAt(0).toUpperCase() : "W";

  return (
    <div 
      className={styles.iconBadge}
      style={{ background: color || "#f4638a" }}
      title={`Workspace icon: ${icon}`}
    >
      <span style={{ fontSize: '18px' }}>{iconMap[icon] || initial}</span>
    </div>
  );
};

export default WorkspaceIcon;