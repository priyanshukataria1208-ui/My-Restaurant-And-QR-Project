import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// ASYNC LOGIN THUNK
export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    const res = await axios.post("http://localhost:3000/api/v1/login", data);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Login Failed"
    );
  }
});

const authiSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: null,
    name: null,
    email: null,
    accessToken: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      // WHEN API STARTS
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // WHEN API SUCCESS
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.accessToken = action.payload.token;
      })

      // WHEN API FAILS
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authiSlice.reducer;
