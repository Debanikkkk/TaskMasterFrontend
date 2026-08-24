import { CheckSquare, Bug, Users } from "lucide-react";
import Card from "../Card/Card";
import { Link } from "react-router-dom";
import styles from "./WorkspaceCard.module.css";

export default function WorkspaceCard({
  icon: Icon,
  iconBg = "#6a5cf5",
  title,
  description,
  progress = 0,
  progressColor = "#6a5cf5",
  tasks = 0,

  members = 0,
  workspaceId,
  onOpen,
}) {
  return (
    <Link className={styles.link} to={`/workspace/${workspaceId}`} onClick={onOpen}>
      <Card className={styles.card}>
      <div className={styles.cardTop}>
        <div className={styles.iconWrap} style={{ backgroundColor: iconBg }}>
          <Icon size={20} color="#fff" />
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

      <div className={styles.statsRow}>
        <div className={styles.stat}>
          <CheckSquare size={14} className={styles.statIcon} />
          <span className={styles.statValue}>{tasks}</span>
          <span className={styles.statLabel}>Tasks</span>
        </div>

        <div className={styles.stat}>
          <Users size={14} className={styles.statIcon} />
          <span className={styles.statValue}>{members}</span>
          <span className={styles.statLabel}>Members</span>
        </div>
      </div>

      </Card>
    </Link>
  );
}
