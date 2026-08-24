import { createPortal } from "react-dom";
import { X } from "lucide-react";
import styles from "../Header/Header.module.css";
import pageStyles from "../Dashboard/Dashboard.module.css";

export default function TaskModal({ workspaceTitle, newTask, setNewTask, onClose, onSubmit }) {
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
              <select id="task-status" className={pageStyles.formSelect} value={newTask.status} onChange={(event) => updateTask("status", event.target.value)}>
                <option value="Todo">To do</option><option value="In Progress">In progress</option><option value="Done">Completed</option>
              </select>
            </div>
            <div>
              <label className={styles.fieldLabel} htmlFor="task-priority">Priority</label>
              <select id="task-priority" className={pageStyles.formSelect} value={newTask.priority} onChange={(event) => updateTask("priority", event.target.value)}>
                <option>Low</option><option>Medium</option><option>High</option>
              </select>
            </div>
          </div>
          <label className={styles.fieldLabel} htmlFor="task-assignee">Assignee</label>
          <input id="task-assignee" className={styles.fieldInput} value={newTask.assignee} onChange={(event) => updateTask("assignee", event.target.value)} placeholder="Who owns this task?" />
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
}
