import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  enrolling: false,
  error: null,
};

export const enrollInCourse = createAsyncThunk(
  'courses/enrollInCourse',
  async (enrollmentData, { rejectWithValue }) => {
    try {
        const storedPayloadString = localStorage.getItem("userPayload");
        const storedPayload = JSON.parse(storedPayloadString);
        const token = storedPayload?.token;
        const id = storedPayload?.id;
      const response = await axios.post('http://localhost:8080/api/enrollCourse', {studentId: id, ...enrollmentData}, {
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

const enrollSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(enrollInCourse.pending, (state) => {
        state.enrolling = true;
        state.error = null;
      })
      .addCase(enrollInCourse.fulfilled, (state) => {
        state.enrolling = false;
        state.error = null;
      })
      .addCase(enrollInCourse.rejected, (state, action) => {
        state.enrolling = false;
        state.error = action.payload ? action.payload.message : 'An error occurred';
      });
  },
});

export default enrollSlice.reducer;
