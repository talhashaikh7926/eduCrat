import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
    fetching: false,
    courseIdData: [],
    error: null,
};

export const fetchCourseId = createAsyncThunk(
    'course/fetchCourseId',
    async (courseId, { rejectWithValue }) => {
        try {
        
            const storedPayloadString = localStorage.getItem("userPayload");
            const storedPayload = JSON.parse(storedPayloadString);
            const token = storedPayload?.token; 
            const response = await axios.post('http://localhost:8080/api/coursesbyId', {courseId:courseId}, {
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

const getCourseIdSlice = createSlice({
    name: 'courseIdData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCourseId.pending, (state) => {
                state.fetching = true;
                state.error = null;
            })
            .addCase(fetchCourseId.fulfilled, (state, action) => {
                state.fetching = false;
                state.courseIdData = action.payload;
                state.error = null;
            })
            .addCase(fetchCourseId.rejected, (state, action) => {
                state.fetching = false;
                state.error = action.payload ? action.payload.message : 'An error occurred';
            });
    },
});

export default getCourseIdSlice.reducer;
