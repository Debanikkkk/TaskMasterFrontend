import apiClient from "./axios";

/**
 * Fetch all tasks from the backend
 */
export const fetchTasks = async () => {
  const response = await apiClient.get("/tasks");
  return response.data;
};

/**
 * Create a new task
 */
export const createTask = async (taskData) => {
  const response = await apiClient.post("/tasks", taskData);
  return response.data;
};
