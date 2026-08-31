import { createPortal } from "react-dom";
import { X } from "lucide-react";
import styles from "../Header/Header.module.css";
import pageStyles from "../Dashboard/Dashboard.module.css";

// Enums matching TaskMasterBackend schema
const TASK_STATUS = {
  TODO: "Todo",
  IN_PROGRESS: "In Progress",
  DONE: "Done"
};

const TASK_PRIORITY = [
  { value: "HIGH", label: "High" },
  { value: "MEDIUM", label: "Medium" },
  { value: "LOW", label: "Low" }
];

const TaskModal = ({ workspaceTitle, newTask, setNewTask, onClose, onSubmit }) => {
  const updateTask = (field, value) => {
    setNewTask({ ...newTask, [field]: value });
  };

  return createPortal(
    <div className={styles.modalOverlay} onMouseDown={onClose}>
      <section className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="new-task-title" onMouseDown={(event) => event.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div>
            <p className={styles.modalEyebrow}>Add to {workspaceTitle}</p>
            <h2 id="new-task-title" className={styles.modalTitle}>Create a task</h2>
          </div>
          <button className={styles.closeButton} type="button" onClick={onClose} aria-label="Close modal"><X size={18} /></button>
        </div>
        <form onSubmit={onSubmit}>
          <label className={styles.fieldLabel} htmlFor="task-title">Task title</label>
          <input id="task-title" className={styles.fieldInput} value={newTask.title} onChange={(event) => updateTask("title", event.target.value)} placeholder="e.g. Review project brief" required autoFocus />
          <label className={styles.fieldLabel} htmlFor="task-description">Description <span>(optional)</span></label>
          <textarea id="task-description" className={styles.fieldInput} value={newTask.description} onChange={(event) => updateTask("description", event.target.value)} placeholder="Add a little context" rows="2" />
          <div className={pageStyles.taskFormGrid}>
            <div>
              <label className={styles.fieldLabel} htmlFor="task-status">Status</label>
              <select id="task-status" className={pageStyles.formSelect} value={newTask.status || TASK_STATUS.TODO} onChange={(event) => updateTask("status", event.target.value)}>
                {Object.entries(TASK_STATUS).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={styles.fieldLabel} htmlFor="task-priority">Priority</label>
              <select id="task-priority" className={pageStyles.formSelect} value={newTask.priority || TASK_PRIORITY[0].value} onChange={(event) => updateTask("priority", event.target.value)}>
                {TASK_PRIORITY.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
          </div>
          <label className={styles.fieldLabel} htmlFor="task-due">Due date</label>
          <input id="task-due" className={styles.fieldInput} type="date" value={newTask.due} onChange={(event) => updateTask("due", event.target.value)} />
          <div className={styles.modalActions}>
            <button className={styles.cancelButton} type="button" onClick={onClose}>Cancel</button>
            <button className={styles.submitButton} type="submit">Create task</button>
          </div>
        </form>
      </section>
    </div>,
    document.getElementById("portal-root"),
  );
};

export default TaskModal;
