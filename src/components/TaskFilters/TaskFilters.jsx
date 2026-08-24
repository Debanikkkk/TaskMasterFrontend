import styles from "../Dashboard/Dashboard.module.css";

export default function TaskFilters({ value, onChange, counts }) {
  return (
    <div className={styles.taskFilters}>
      <label className={styles.filterLabel} htmlFor="task-status-filter">
        Show tasks
      </label>
      <select
        id="task-status-filter"
        className={styles.filterSelect}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="All">All tasks ({counts.all})</option>
        <option value="Todo">To do ({counts.todo})</option>
        <option value="In Progress">In progress ({counts.inProgress})</option>
        <option value="Done">Completed ({counts.done})</option>
      </select>
    </div>
  );
}
