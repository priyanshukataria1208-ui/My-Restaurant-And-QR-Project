import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


// LOGIN
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

// REGISTER
export const Register = createAsyncThunk("auth/register", async (data, thunkAPI) => {
  try {
    const res = await axios.post("http://localhost:3000/api/v1/register", data);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Register Failed"
    );
  }
});

const authiSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: null,
    name: localStorage.getItem("name")||null,
    email: null,
    role: localStorage.getItem("role")||null,
    accessToken: null,
    refershToken: null,
  },

  reducers: {
    logOut:(state)=>{
      state.name=null;
      state.email=null;
      state.role=null;
      localStorage.removeItem("accessToken")
      localStorage.removeItem("role")

    }
  },

  extraReducers: (builder) => {
    builder

      // LOGIN
      .addCase(login.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        console.log("Login pending...");
      })

      .addCase(login.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.name = action.payload.name;      // MongoDB se
        state.email = action.payload.email;    // MongoDB se
        state.accessToken = action.payload.accessToken;
        state.refershToken = action.payload.refershToken;
        state.role=action.payload.role


        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("refershToken", action.payload.refershToken);
        localStorage.setItem("role",action.payload.role)
      })

      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // REGISTER
      .addCase(Register.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(Register.fulfilled, (state, action) => {
        state.loading = false;
      })

      .addCase(Register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default authiSlice.reducer;
export const {logOut}=authiSlice.actions