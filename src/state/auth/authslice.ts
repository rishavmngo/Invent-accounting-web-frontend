import { LoginUser, RegisterUser, User } from "@/types/user.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AuthState {
  user: User | null;
  ownerId: number | undefined;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  ownerId: undefined,
  token: null,
  isLoading: false,
  isAuthenticated: false,
  error: null,
};

const API_URL = "http://localhost:5000/auth";

interface AuthResponse {
  user: User;
  token: string;
}
// Add auto-login thunk
const verifyToken = createAsyncThunk<
  AuthResponse,
  void,
  { rejectValue: string }
>("auth/verify", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      return rejectWithValue("No token found");
    }

    const response = await fetch(`${API_URL}/verify`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      localStorage.removeItem("token");
      return rejectWithValue("Invalid token");
    }

    const data = await response.json();
    return { user: data.data.user, token };
  } catch (error) {
    console.log(error);
    localStorage.removeItem("token");
    return rejectWithValue("Failed to verify token");
  }
});

const login = createAsyncThunk<
  AuthResponse,
  LoginUser,
  { rejectValue: string }
>("auth/login", async (credentials, { rejectWithValue }) => {
  console.log("start");
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      return rejectWithValue("Login failed");
    }

    const data = await response.json();

    console.log("response", data);
    localStorage.setItem("token", data.data.token);

    return data;
  } catch (error) {
    console.log(error);
    return rejectWithValue("An error occured during login");
  }
  console.log("end");
});

const signup = createAsyncThunk<
  AuthResponse,
  RegisterUser,
  { rejectValue: string }
>("auth/signup", async (credentials, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      return rejectWithValue("Login failed");
    }

    const data = await response.json();

    localStorage.setItem("token", data.data.token);

    return data;
  } catch (error) {
    console.log(error);
    return rejectWithValue("dkdk");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.ownerId = action.payload.user.id;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Handle signup async thunk states
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.ownerId = action.payload.user.id;
        state.token = action.payload.token;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(verifyToken.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.ownerId = action.payload.user.id;
        state.token = action.payload.token;
      })
      .addCase(verifyToken.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.ownerId = undefined;
        state.token = null;
      });
  },
});
export const { logout } = authSlice.actions;
export { login, signup, verifyToken };
export default authSlice;
