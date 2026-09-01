// const API_BASE_URL = "http://localhost:8080/api";
const API_BASE_URL =
  "https://expensemanagerbackend-production-501f.up.railway.app/api";

  // const API_BASE_URL =
  // "https://expensemanagerbackend-production-501f.up.railway.app/api";
export const api = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Request failed with status ${response.status}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
};