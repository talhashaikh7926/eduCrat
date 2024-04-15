import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const storedPayloadString = localStorage.getItem("userPayload");
const storedPayload = JSON.parse(storedPayloadString);
const token = storedPayload?.token;

const initialState = {
  creating: false,
  error: null,
};


export const createCourse = createAsyncThunk(
  'courses/createCourse',
  async (courseData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8080/api/createCourse', courseData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Define course slice
const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCourse.pending, (state) => {
        state.creating = true;
        state.error = null;
      })
      .addCase(createCourse.fulfilled, (state) => {
        state.creating = false;
        state.error = null;
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.creating = false;
        state.error = action.payload ? action.payload.message : 'An error occurred';
      });
  },
});

export default courseSlice.reducer;
