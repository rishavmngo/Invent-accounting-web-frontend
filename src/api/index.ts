import { store } from "@/state/store";

const API_BASE_URL = "http://localhost:5000";

export const apiClient = async (endpoint: string, options = {}) => {
  const token = store.getState().auth.token;

  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...defaultOptions,
    ...options,
  });

  // Error handling as before
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "API request failed");
  }

  return response.json();
};
