import { Rocket, Monitor, Zap, Heart, Smartphone, Package, Cake, BarChart2 } from "lucide-react";
import Card from "../Card/Card";
import { Link } from "react-router-dom";
import styles from "./WorkspaceCard.module.css";

// Map icon name string to actual component
const ICON_COMPONENTS = {
  "Rocket": Rocket,
  "Monitor": Monitor,
  "Zap": Zap,
  "Heart": Heart,
  "Smartphone": Smartphone,
  "Package": Package,
  "Cake": Cake,
  "BarChart2": BarChart2,
  // "Chess": Chess
};

const WorkspaceCard = ({
  icon: Icon,
  iconLabel,
  iconBg = "#6a5cf5",
  title,
  description,
  progress = 0,
  progressColor = "#6a5cf5",
  tasks = 0,
  workspaceId,
  onOpen,
}) => {
  // Handle both component and string name for icon
  const IconComponent = typeof Icon === 'string' 
    ? ICON_COMPONENTS[Icon] || Rocket 
    : Icon;

  return (
    <Link className={styles.link} to={`/workspace/${workspaceId}`} onClick={onOpen}>
      <Card className={styles.card}>
      <div className={styles.cardTop}>
        <div className={styles.iconWrap} style={{ backgroundColor: iconBg }}>

          <IconComponent size={20} color="#fff" />
        </div>
      </div>

      <h3 className={styles.title}>{title}</h3>

      <p className={styles.description}>{description}</p>

      <div className={styles.progressRow}>
        <span className={styles.progressLabel}>Progress</span>
        <span className={styles.progressValue}>{progress}%</span>
      </div>
      <div className={styles.progressTrack}>
        <div
          className={styles.progressFill}
          style={{ width: `${progress}%`, backgroundColor: progressColor }}
        />
      </div>

      </Card>
    </Link>
  );
};

export default WorkspaceCard;