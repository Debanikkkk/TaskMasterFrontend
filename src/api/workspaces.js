import apiClient from "./axios";

/**
 * Fetch all workspaces from the backend
 */
export const fetchWorkspaces = async () => {
  const response = await apiClient.get("/workspaces");
  return response.data;
};

/**
 * Create a new workspace
 */
export const createWorkspace = async (workspaceData) => {
  const response = await apiClient.post("/workspaces", workspaceData);
  return response.data;
};

/**
 * Fetch dashboard data for workspaces
 */
export const fetchDashboardData = async () => {
  const response = await apiClient.get("/workspaces/dashboard");
  return response.data;
};
