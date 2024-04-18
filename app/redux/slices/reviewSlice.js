import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
    fetching: false,
    reviews: [],
    error: null,
};

export const fetchReviews = createAsyncThunk(
    'reviews/fetchReview',
    async (Id, { rejectWithValue }) => {
        try {
            const storedPayloadString = localStorage.getItem("userPayload");
            const storedPayload = JSON.parse(storedPayloadString);
            const token = storedPayload?.token;
            const response = await axios.post('http://localhost:8080/api/courses/all/reviews', { courseId: Id }, {
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

const getReviewSlice = createSlice({
    name: 'reviewsStd',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchReviews.pending, (state) => {
                state.fetching = true;
                state.error = null;
            })
            .addCase(fetchReviews.fulfilled, (state, action) => {
                state.fetching = false;
                state.reviews = action.payload;
                state.error = null;
            })
            .addCase(fetchReviews.rejected, (state, action) => {
                state.fetching = false;
                state.error = action.payload ? action.payload.message : 'An error occurred';
            });
    },
});

export default getReviewSlice.reducer;
