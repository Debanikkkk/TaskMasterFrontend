import { CheckSquare, Bug, Users, Star, MoreHorizontal } from "lucide-react";
import Card from "../Card/Card";
import styles from "./WorkspaceCard.module.css";

export default function WorkspaceCard({
  icon: Icon,
  iconBg = "#6a5cf5",
  title,
  description,
  progress = 0,
  progressColor = "#6a5cf5",
  tasks = 0,
  bugs = 0,
  members = 0,
  starred = false,
  updatedText = "Updated recently",
  workspaceId,
  onOpen,
}) {
  return (
    <Card
      as="link"
      className={styles.cardContent}
      to={`/workspace/${workspaceId}`}
      onClick={onOpen}
    >
      <div className={styles.cardTop}>
        <div className={styles.iconWrap} style={{ backgroundColor: iconBg }}>
          <Icon size={20} color="#fff" />
        </div>
        {starred && (
          <Star size={18} className={styles.starIcon} fill="#f4b740" strokeWidth={0} />
        )}
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
          <Bug size={14} className={styles.statIcon} />
          <span className={styles.statValue}>{bugs}</span>
          <span className={styles.statLabel}>Bugs</span>
        </div>
        <div className={styles.stat}>
          <Users size={14} className={styles.statIcon} />
          <span className={styles.statValue}>{members}</span>
          <span className={styles.statLabel}>Members</span>
        </div>
      </div>

      <div className={styles.footer}>
        <span className={styles.updated}>{updatedText}</span>
        <MoreHorizontal size={18} className={styles.moreIcon} />
      </div>
    </Card>
  );
}
