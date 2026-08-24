import styles from '../Dashboard/Dashboard.module.css'
import { CheckCircle2, Clock3, Circle } from "lucide-react";

const TaskComp=({task})=>{
const statusIcons = { Todo: Circle, "In Progress": Clock3, Done: CheckCircle2 };

     const StatusIcon = statusIcons[task.status];
        return (
            <div className={styles.taskRow} key={task.id}>
            <StatusIcon size={18} className={`${styles.statusIcon} ${styles[`status${task.status.replace(" ", "")}`]}`} />
            <div className={styles.taskDetails}>
                <strong>{task.title}</strong>
                <span><i style={{ backgroundColor: task.color }} />{task.workspace}</span>
            </div>
            <span className={`${styles.priority} ${styles[`priority${task.priority}`]}`}>{task.priority}</span>
            <span className={styles.assignee}>{task.assignee}</span>
            <span className={styles.dueDate}>{task.due}</span>
            </div>
        );
}

export default TaskComp