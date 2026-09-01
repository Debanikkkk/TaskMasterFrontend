import { useEffect, useState } from "react";
import { ArrowLeft, Plus } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import Card from "../Card/Card";
import TaskModal from "../TaskModal/TaskModal";
import TaskFilters from "../TaskFilters/TaskFilters";
import styles from "../Dashboard/Dashboard.module.css";
import TaskComp from "../TaskComp/TaskComp";

import {
  fetchWorkspaces,
} from "../../redux/slices/workspaceSlice";

import {
  fetchTasks,
  createTask,
  updateTask,
} from "../../redux/slices/taskSlice";


const WorkspacePage = () => {
  const { workspaceId } = useParams();
  const dispatch = useDispatch();

  const {
    workspaces,
    loading: workspaceLoading,
  } = useSelector((state) => state.workspaces);

  const {
    tasks,
    loading: taskLoading,
  } = useSelector((state) => state.tasks);

  const [taskFilter, setTaskFilter] = useState("All");
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  // const [newTask, setNewTask] = useState({
  //   title: "",
  //   description: "",
  //   status: "Todo",
  //   priority: "Medium",
  //   due: "",
  // });

  // // Load data when page mounts
  // useEffect(() => {
  //   if (workspaces.length === 0) {
  //     dispatch(fetchWorkspaces());
  //   }

  //   if (tasks.length === 0) {
  //     dispatch(fetchTasks());
  //   }
  // }, [dispatch, workspaces.length, tasks.length]);

  const workspace = workspaces.find(
    (item) => String(item.id) === workspaceId
  );

  const workspaceTasks = tasks.filter(
    (task) => task.workspaceId === workspace?.id
  );

  const visibleTasks =
    taskFilter === "All"
      ? workspaceTasks
      : workspaceTasks.filter(
          (task) => task.status === taskFilter
        );

  const taskCount = (status) =>
    workspaceTasks.filter(
      (task) => task.status === status
    ).length;

  const taskCounts = {
    all: workspaceTasks.length,
    todo: taskCount("Todo"),
    inProgress: taskCount("In Progress"),
    done: taskCount("Done"),
  };

  // UPDATE TASK STATUS
  const handleStatusChange = (taskId, status) => {
    const task = tasks.find((item) => item.id === taskId);

    if (!task) return;

    dispatch(
      updateTask({
        id: taskId,
        taskData: {
          ...task,
          status,
        },
      })
    );
  };

  // ESCAPE TO CLOSE MODAL
  useEffect(() => {
    if (!isTaskModalOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsTaskModalOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isTaskModalOpen]);

  const closeTaskModal = () => {
    setIsTaskModalOpen(false);

    setNewTask({
      title: "",
      description: "",
      status: "Todo",
      priority: "Medium",
      due: "",
    });
  };

  // CREATE TASK
  const handleTaskSubmit = async (event) => {
    event.preventDefault();

    if (!newTask.title.trim()) return;

    try {
      await dispatch(
        createTask({
          workspaceId: workspace.id,
          title: newTask.title.trim(),
          description: newTask.description,
          status: newTask.status,
          priority: newTask.priority,
          due: newTask.due || null,
        })
      ).unwrap();

      closeTaskModal();
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  if (workspaceLoading || taskLoading) {
    return (
      <div className={styles.page}>
        <Sidebar workspaces={workspaces} />

        <main className={styles.main}>
          <Header />

          <div className={styles.content}>
            <section className={styles.tasksPanel}>
              <div className={styles.emptyState}>
                Loading workspace...
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  }

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
                  <p className={styles.sectionEyebrow}>
                    Workspace not found
                  </p>

                  <h2 className={styles.sectionTitle}>
                    This workspace does not exist
                  </h2>
                </div>

                <Link
                  className={styles.backButton}
                  to="/dashboard"
                >
                  <ArrowLeft size={15} />
                  All workspaces
                </Link>
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
        <Header
          title={workspace.title}
          subtitle="Everything happening in this workspace."
        />

        <div className={styles.content}>
          <section
            className={styles.workspaceSection}
            aria-labelledby="workspace-tasks-title"
          >
            <div className={styles.tasksHeader}>
              <div>
                <Link
                  className={styles.backButton}
                  to="/dashboard"
                >
                  <ArrowLeft size={15} />
                  All workspaces
                </Link>

                <h2
                  id="workspace-tasks-title"
                  className={styles.sectionTitle}
                >
                  {workspace.title}
                </h2>

                <p className={styles.workspaceDescription}>
                  {workspace.description}
                </p>
              </div>

              <button
                className={styles.addTaskButton}
                type="button"
                onClick={() => setIsTaskModalOpen(true)}
              >
                <Plus size={15} />
                Add task
              </button>
            </div>

            <Card className={styles.taskTableCard}>
              <TaskFilters
                value={taskFilter}
                onChange={setTaskFilter}
                counts={taskCounts}
              />

              <div className={styles.taskList}>
                {visibleTasks.length === 0 && (
                  <div className={styles.emptyState}>
                    No tasks in this workspace yet.
                  </div>
                )}

                {visibleTasks.map((task) => (
                  <TaskComp
                    key={task.id}
                    task={task}
                    onStatusChange={handleStatusChange}
                  />
                ))}
              </div>
            </Card>
          </section>
        </div>

        {isTaskModalOpen && (
          <TaskModal
  workspaceId={workspace.id}
  workspaceTitle={workspace.title}
  onClose={closeTaskModal}
/>
        )}
      </main>
    </div>
  );
};

export default WorkspacePage;