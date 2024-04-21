import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
    fetching: false,
    stdreviews: [],
    error: null,
};

export const fetchStudentReviews = createAsyncThunk(
    'reviews/fetchStudentReview',
    async (__, { rejectWithValue }) => {
        try {
            const storedPayloadString = localStorage.getItem("userPayload");
            const storedPayload = JSON.parse(storedPayloadString);
            const token = storedPayload?.token;
            const id = storedPayload?.id;
            const response = await axios.post('http://localhost:8080/api/courses/teacher/reviews', { teacherId: id }, {
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

const getStudentReviewSlice = createSlice({
    name: 'reviewsStd',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStudentReviews.pending, (state) => {
                state.fetching = true;
                state.error = null;
            })
            .addCase(fetchStudentReviews.fulfilled, (state, action) => {
                state.fetching = false;
                state.stdreviews = action.payload;
                state.error = null;
            })
            .addCase(fetchStudentReviews.rejected, (state, action) => {
                state.fetching = false;
                state.error = action.payload ? action.payload.message : 'An error occurred';
            });
    },
});

export default getStudentReviewSlice.reducer;
