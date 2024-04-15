import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const storedPayloadString = localStorage.getItem("userPayload");

const storedPayload = JSON.parse(storedPayloadString);
const token = storedPayload?.token;


const initialState = {
    creating: false,
    error: null,
};


export const createProfile = createAsyncThunk(
    'profile/createProfile',
    async (profileData, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:8080/api/updateProfile', profileData, {
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

// Define profile slice
const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createProfile.pending, (state) => {
                state.creating = true;
                state.error = null;
            })
            .addCase(createProfile.fulfilled, (state) => {
                state.creating = false;
                state.error = null;
            })
            .addCase(createProfile.rejected, (state, action) => {
                state.creating = false;
                state.error = action.payload ? action.payload.message : 'An error occurred';
            });
    },
});

export default profileSlice.reducer;
