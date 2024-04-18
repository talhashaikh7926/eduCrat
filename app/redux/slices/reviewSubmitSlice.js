import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';



const initialState = {
    creating: false,
    error: null,
};


export const submitReview = createAsyncThunk(
    'reviews/createReview',
    async (review, { rejectWithValue }) => {
        try {
            const storedPayloadString = localStorage.getItem("userPayload");
            const storedPayload = JSON.parse(storedPayloadString);
            const token = storedPayload?.token;
            const id = storedPayload?.id;
            const response = await axios.post('http://localhost:8080/api/courses/add/reviews', { ...review, userId: id }, {
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



export const respondReviews = createAsyncThunk(
    'reviews/respondReview',
    async (reviewRespond, { rejectWithValue }) => {

        try {
            const response = await axios.post('http://localhost:8080/api/reviews/respond', reviewRespond, {
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
