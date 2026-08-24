import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft, CheckCircle2, Clock3, Circle, Plus } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import Card from "../Card/Card";
import { initialWorkspaces, tasks } from "../Dashboard/Dashboard";
import styles from "../Dashboard/Dashboard.module.css";
import modalStyles from "../Header/Header.module.css";

const statusIcons = { Todo: Circle, "In Progress": Clock3, Done: CheckCircle2 };

export default function WorkspacePage() {
  const { workspaceId } = useParams();
  const [taskFilter, setTaskFilter] = useState("All");
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [workspaceTasksState, setWorkspaceTasksState] = useState(tasks);
  const [newTask, setNewTask] = useState({ title: "", description: "", status: "Todo", priority: "Medium", assignee: "Debanik P.", due: "" });
  const workspace = initialWorkspaces.find((item) => String(item.id) === workspaceId);
  const workspaceTasks = workspaceTasksState.filter((task) => task.workspace === workspace?.title);
  const visibleTasks = taskFilter === "All"
    ? workspaceTasks
    : workspaceTasks.filter((task) => task.status === taskFilter);
  const taskCount = (status) => workspaceTasks.filter((task) => task.status === status).length;

  useEffect(() => {
    if (!isTaskModalOpen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsTaskModalOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isTaskModalOpen]);

  const closeTaskModal = () => {
    setIsTaskModalOpen(false);
    setNewTask({ title: "", description: "", status: "Todo", priority: "Medium", assignee: "Debanik P.", due: "" });
  };

  const handleTaskSubmit = (event) => {
    event.preventDefault();
    setWorkspaceTasksState((currentTasks) => [
      ...currentTasks,
      {
        id: Date.now(),
        title: newTask.title.trim(),
        workspace: workspace.title,
        assignee: newTask.assignee.trim() || "Unassigned",
        status: newTask.status,
        priority: newTask.priority,
        due: newTask.due || "No due date",
        color: workspace.iconBg,
      },
    ]);
    closeTaskModal();
  };

  if (!workspace) {
    return (
      <div className={styles.page}>
        <Sidebar workspaces={initialWorkspaces} />
        <main className={styles.main}>
          <Header />
          <div className={styles.content}>
            <section className={styles.tasksPanel}>
              <div className={styles.tasksHeader}>
                <div>
                  <p className={styles.sectionEyebrow}>Workspace not found</p>
                  <h2 className={styles.sectionTitle}>This workspace does not exist</h2>
                </div>
                <Link className={styles.backButton} to="/dashboard"><ArrowLeft size={15} /> All workspaces</Link>
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Sidebar workspaces={initialWorkspaces} />
      <main className={styles.main}>
        <Header title={workspace.title} subtitle="Everything happening in this workspace." />
        <div className={styles.content}>
          <section className={styles.workspaceSection} aria-labelledby="workspace-tasks-title">
            <div className={styles.tasksHeader}>
              <div>
                <Link className={styles.backButton} to="/dashboard"><ArrowLeft size={15} /> All workspaces</Link>
                <p className={styles.sectionEyebrow}>Workspace tasks</p>
                <h2 id="workspace-tasks-title" className={styles.sectionTitle}>{workspace.title}</h2>
                <p className={styles.workspaceDescription}>{workspace.description}</p>
              </div>
              <button className={styles.addTaskButton} type="button" onClick={() => setIsTaskModalOpen(true)}><Plus size={15} /> Add task</button>
            </div>
            <Card className={styles.taskTableCard}>
            <div className={styles.taskFilters}>
              <label className={styles.filterLabel} htmlFor="task-status-filter">Show tasks</label>
              <select id="task-status-filter" className={styles.filterSelect} value={taskFilter} onChange={(event) => setTaskFilter(event.target.value)}>
                <option value="All">All tasks ({workspaceTasks.length})</option>
                <option value="Todo">To do ({taskCount("Todo")})</option>
                <option value="In Progress">In progress ({taskCount("In Progress")})</option>
                <option value="Done">Completed ({taskCount("Done")})</option>
              </select>
            </div>
            <div className={styles.taskList}>
              {visibleTasks.length === 0 && <div className={styles.emptyState}>No tasks in this workspace yet.</div>}
              {visibleTasks.map((task) => {
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
              })}
            </div>
            </Card>
          </section>
        </div>
        {isTaskModalOpen && createPortal(
          <div className={modalStyles.modalOverlay} onMouseDown={closeTaskModal}>
            <section className={modalStyles.modal} role="dialog" aria-modal="true" aria-labelledby="new-task-title" onMouseDown={(event) => event.stopPropagation()}>
              <div className={modalStyles.modalHeader}>
                <div>
                  <p className={modalStyles.modalEyebrow}>Add to {workspace.title}</p>
                  <h2 id="new-task-title" className={modalStyles.modalTitle}>Create a task</h2>
                </div>
                <button className={modalStyles.closeButton} type="button" onClick={closeTaskModal} aria-label="Close modal">×</button>
              </div>
              <form onSubmit={handleTaskSubmit}>
                <label className={modalStyles.fieldLabel} htmlFor="task-title">Task title</label>
                <input id="task-title" className={modalStyles.fieldInput} value={newTask.title} onChange={(event) => setNewTask({ ...newTask, title: event.target.value })} placeholder="e.g. Review project brief" required autoFocus />
                <label className={modalStyles.fieldLabel} htmlFor="task-description">Description <span>(optional)</span></label>
                <textarea id="task-description" className={modalStyles.fieldInput} value={newTask.description} onChange={(event) => setNewTask({ ...newTask, description: event.target.value })} placeholder="Add a little context" rows="2" />
                <div className={styles.taskFormGrid}>
                  <div>
                    <label className={modalStyles.fieldLabel} htmlFor="task-status">Status</label>
                    <select id="task-status" className={styles.formSelect} value={newTask.status} onChange={(event) => setNewTask({ ...newTask, status: event.target.value })}>
                      <option value="Todo">To do</option><option value="In Progress">In progress</option><option value="Done">Completed</option>
                    </select>
                  </div>
                  <div>
                    <label className={modalStyles.fieldLabel} htmlFor="task-priority">Priority</label>
                    <select id="task-priority" className={styles.formSelect} value={newTask.priority} onChange={(event) => setNewTask({ ...newTask, priority: event.target.value })}>
                      <option>Low</option><option>Medium</option><option>High</option>
                    </select>
                  </div>
                </div>
                <label className={modalStyles.fieldLabel} htmlFor="task-assignee">Assignee</label>
                <input id="task-assignee" className={modalStyles.fieldInput} value={newTask.assignee} onChange={(event) => setNewTask({ ...newTask, assignee: event.target.value })} placeholder="Who owns this task?" />
                <label className={modalStyles.fieldLabel} htmlFor="task-due">Due date</label>
                <input id="task-due" className={modalStyles.fieldInput} type="date" value={newTask.due} onChange={(event) => setNewTask({ ...newTask, due: event.target.value })} />
                <div className={modalStyles.modalActions}>
                  <button className={modalStyles.cancelButton} type="button" onClick={closeTaskModal}>Cancel</button>
                  <button className={modalStyles.submitButton} type="submit">Create task</button>
                </div>
              </form>
            </section>
          </div>,
          document.getElementById("portal-root"),
        )}
      </main>
    </div>
  );
}
