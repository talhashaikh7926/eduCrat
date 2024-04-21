import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
    fetching: false,
    admdashboard: [],
    error: null,
};

export const fetchadminDashboard = createAsyncThunk(
    'dashboard/fetchadminDashboard',
    async (_, { rejectWithValue }) => {
        try {
            const storedPayloadString = localStorage.getItem("userPayload");
            const storedPayload = JSON.parse(storedPayloadString);
            const token = storedPayload?.token;
            const id = storedPayload?.id;
            const response = await axios.post('http://localhost:8080/api/dashboard/admin', { admin: id }, {
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

const adminDashboardSlice = createSlice({
    name: 'dashboardData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchadminDashboard.pending, (state) => {
                state.fetching = true;
                state.error = null;
            })
            .addCase(fetchadminDashboard.fulfilled, (state, action) => {
                state.fetching = false;
                state.admdashboard = action.payload;
                state.error = null;
            })
            .addCase(fetchadminDashboard.rejected, (state, action) => {
                state.fetching = false;
                state.error = action.payload ? action.payload.message : 'An error occurred';
            });
    },
});

export default adminDashboardSlice.reducer;
