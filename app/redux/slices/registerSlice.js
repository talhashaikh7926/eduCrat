import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState ={
    newUser: null,
    isRegistered: false,
    isLoading: false, // Add loading state to track loading status
};

export const registerUser = createAsyncThunk(
  'register/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8080/api/signup', userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const registerSlice =  createSlice({
    name:'register',
    initialState,
    reducers:{
        // You can remove the register reducer, as createAsyncThunk automatically handles it
    },
    extraReducers: (builder) => {
      builder
        .addCase(registerUser.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
          state.isLoading = false;
          state.newUser = action.payload;
          state.isRegistered = true;
        })
        .addCase(registerUser.rejected, (state) => {
          state.isLoading = false;
          // Handle registration failure if needed
        });
    },
});

export default registerSlice.reducer;
