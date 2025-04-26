import { NewParty, Party } from "@/types/party.type";
import { LoginUser, RegisterUser } from "@/types/user.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface PartiesState {
  partiesList: Party[];
  error: string | null;
}

const initialState: PartiesState = {
  partiesList: [],
  error: null,
};

const API_URL = "http://localhost:5000/party";

// Add auto-login thunk
const addNewParty = createAsyncThunk<
  Party[],
  NewParty,
  { rejectValue: string }
>("party/add", async (newParty, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      return rejectWithValue("No token found");
    }

    const response = await fetch(`${API_URL}/add`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newParty),
    });

    if (!response.ok) {
      return rejectWithValue("Failed to add new party");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.log(error);
    return rejectWithValue("Failed to add new party");
  }
});

const partySlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(addNewParty.pending, (state) => {
      state.error = null;
    });
  },
});
// export const { logout } = authSlice.actions;
export { addNewParty };
export default partySlice;
