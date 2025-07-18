import { store } from "@/state/store";

const API_BASE_URL = "http://localhost:5000";

export const apiClient = async (
  endpoint: string,
  options = {},
  raw?: boolean,
) => {
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
  if (raw) return response;

  return response.json();
};
export const apiClientFormData = async (
  endpoint: string,
  options = {},
  raw?: boolean,
) => {
  const token = store.getState().auth.token;

  const defaultOptions = {
    headers: {
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
  if (raw) return response;

  return response.json();
};
export type ApiResponse<T> = {
  success: boolean;
  code: string;
  message: string;
  data: T;
};
