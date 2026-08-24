import { useState } from "react";
import { ArrowLeft, CheckCircle2, Clock3, Circle, Plus } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import { initialWorkspaces, tasks } from "../Dashboard/Dashboard";
import styles from "../Dashboard/Dashboard.module.css";

const statusIcons = { Todo: Circle, "In Progress": Clock3, Done: CheckCircle2 };

export default function WorkspacePage() {
  const { workspaceId } = useParams();
  const [taskFilter, setTaskFilter] = useState("All");
  const workspace = initialWorkspaces.find((item) => String(item.id) === workspaceId);
  const workspaceTasks = tasks.filter((task) => task.workspace === workspace?.title);
  const visibleTasks = taskFilter === "All"
    ? workspaceTasks
    : workspaceTasks.filter((task) => task.status === taskFilter);
  const taskCount = (status) => workspaceTasks.filter((task) => task.status === status).length;

  if (!workspace) {
    return (
      <div className={styles.page}>
        <Sidebar />
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
      <Sidebar />
      <main className={styles.main}>
        <Header title={workspace.title} subtitle="Everything happening in this workspace." />
        <div className={styles.content}>
          <section className={styles.tasksPanel} aria-labelledby="workspace-tasks-title">
            <div className={styles.tasksHeader}>
              <div>
                <Link className={styles.backButton} to="/dashboard"><ArrowLeft size={15} /> All workspaces</Link>
                <p className={styles.sectionEyebrow}>Workspace tasks</p>
                <h2 id="workspace-tasks-title" className={styles.sectionTitle}>{workspace.title}</h2>
                <p className={styles.workspaceDescription}>{workspace.description}</p>
              </div>
              <button className={styles.addTaskButton} type="button"><Plus size={15} /> Add task</button>
            </div>
            <div className={styles.taskFilters} role="tablist" aria-label="Task status filters">
              {[{ label: "All tasks", value: "All", count: workspaceTasks.length }, { label: "To do", value: "Todo", count: taskCount("Todo") }, { label: "In progress", value: "In Progress", count: taskCount("In Progress") }, { label: "Completed", value: "Done", count: taskCount("Done") }].map((filter) => (
                <button key={filter.value} className={`${styles.filterButton} ${taskFilter === filter.value ? styles.filterButtonActive : ""}`} type="button" onClick={() => setTaskFilter(filter.value)} aria-selected={taskFilter === filter.value}>
                  {filter.label} <span>{filter.count}</span>
                </button>
              ))}
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
          </section>
        </div>
      </main>
    </div>
  );
}
