import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const storedPayloadString = localStorage.getItem("userPayload");
const storedPayload = JSON.parse(storedPayloadString);
const token = storedPayload?.token;


const initialState = {
  fetching: false,
  courses: [],
  error: null,
};

export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:8080/api/courses', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data; // Ensure that the payload structure matches what your reducer expects
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const getCourseSlice = createSlice({
  name: 'allCourses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.fetching = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.fetching = false;
        state.courses = action.payload; // Make sure action.payload is correctly assigned
        state.error = null;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.fetching = false;
        state.error = action.payload ? action.payload.message : 'An error occurred';
      });
  },
});

export default getCourseSlice.reducer;
