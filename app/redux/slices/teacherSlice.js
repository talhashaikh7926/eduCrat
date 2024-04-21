import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const storedPayloadString = localStorage.getItem("userPayload");
const storedPayload = storedPayloadString ? JSON.parse(storedPayloadString) : null;
const token = storedPayload?.token;


const initialState = {
  fetching: false,
  teachers: [],
  error: null,
};

export const fetchTeachers = createAsyncThunk(
  'teachers/fetchTeacher',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8080/api/teacher/record', {
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

const getTeacherSlice = createSlice({
  name: 'allTeacher',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachers.pending, (state) => {
        state.fetching = true;
        state.error = null;
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.fetching = false;
        state.teachers = action.payload; 
        state.error = null;
      })
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.fetching = false;
        state.error = action.payload ? action.payload.message : 'An error occurred';
      });
  },
});

export default getTeacherSlice.reducer;
