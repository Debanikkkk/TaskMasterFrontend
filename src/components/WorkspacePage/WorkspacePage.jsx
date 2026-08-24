import { useEffect, useState } from "react";
import { ArrowLeft, Plus } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import Card from "../Card/Card";
import TaskModal from "../TaskModal/TaskModal";
import TaskFilters from "../TaskFilters/TaskFilters";
import styles from "../Dashboard/Dashboard.module.css";
import TaskComp from "../TaskComp/TaskComp";


const WorkspacePage = ({ workspaces, tasks, setTasks }) => {
  const { workspaceId } = useParams();
  const [taskFilter, setTaskFilter] = useState("All");
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", description: "", status: "Todo", priority: "Medium", due: "" });
  const workspace = workspaces.find((item) => String(item.id) === workspaceId);
  const workspaceTasks = tasks.filter((task) => task.workspaceId === workspace?.id);
  const visibleTasks = taskFilter === "All"
    ? workspaceTasks
    : workspaceTasks.filter((task) => task.status === taskFilter);
  const taskCount = (status) => workspaceTasks.filter((task) => task.status === status).length;
  const taskCounts = {
    all: workspaceTasks.length,
    todo: taskCount("Todo"),
    inProgress: taskCount("In Progress"),
    done: taskCount("Done"),
  };

  const handleStatusChange = (taskId, status) => {
    setTasks((currentTasks) => currentTasks.map((task) => (
      task.id === taskId ? { ...task, status } : task
    )));
  };

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
    setNewTask({ title: "", description: "", status: "Todo", priority: "Medium", due: "" });
  };

  const handleTaskSubmit = (event) => {
    event.preventDefault();
    setTasks((currentTasks) => [
      ...currentTasks,
      {
        id: Date.now(),
        workspaceId: workspace.id,
        title: newTask.title.trim(),
        workspace: workspace.title,
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
        <Sidebar workspaces={workspaces} />
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
      <Sidebar workspaces={workspaces} />
      <main className={styles.main}>
        <Header title={workspace.title} subtitle="Everything happening in this workspace." />
        <div className={styles.content}>
          <section className={styles.workspaceSection} aria-labelledby="workspace-tasks-title">
            <div className={styles.tasksHeader}>
              <div>
                <Link className={styles.backButton} to="/dashboard"><ArrowLeft size={15} /> All workspaces</Link>
                <h2 id="workspace-tasks-title" className={styles.sectionTitle}>{workspace.title}</h2>
                <p className={styles.workspaceDescription}>{workspace.description}</p>
              </div>
              <button className={styles.addTaskButton} type="button" onClick={() => setIsTaskModalOpen(true)}><Plus size={15} /> Add task</button>
            </div>
            <Card className={styles.taskTableCard}>
            <TaskFilters
              value={taskFilter}
              onChange={setTaskFilter}
              counts={taskCounts}
            />
            <div className={styles.taskList}>
              {visibleTasks.length === 0 && <div className={styles.emptyState}>No tasks in this workspace yet.</div>}
              {visibleTasks.map((task) => {
                return <TaskComp key={task.id} task={task} onStatusChange={handleStatusChange} />
              })}
            </div>
            </Card>
          </section>
        </div>
        {isTaskModalOpen && (
          <TaskModal
            workspaceTitle={workspace.title}
            newTask={newTask}
            setNewTask={setNewTask}
            onClose={closeTaskModal}
            onSubmit={handleTaskSubmit}
          />
        )}
      </main>
    </div>
  );
};

export default WorkspacePage;
