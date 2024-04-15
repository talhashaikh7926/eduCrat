import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
    fetching: false,
    dashboard: [],
    error: null,
};

export const fetchDashboard = createAsyncThunk(
    'dashboard/fetchDashboard',
    async (_, { rejectWithValue }) => {
        try {
            const storedPayloadString = localStorage.getItem("userPayload");
            const storedPayload = JSON.parse(storedPayloadString);
            const token = storedPayload?.token;
            const id = storedPayload?.id;
            const response = await axios.post('http://localhost:8080/api/dashboard/teacher', { teacherId: id }, {
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

const teacherDashboardSlice = createSlice({
    name: 'dashboardData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboard.pending, (state) => {
                state.fetching = true;
                state.error = null;
            })
            .addCase(fetchDashboard.fulfilled, (state, action) => {
                state.fetching = false;
                state.dashboard = action.payload;
                state.error = null;
            })
            .addCase(fetchDashboard.rejected, (state, action) => {
                state.fetching = false;
                state.error = action.payload ? action.payload.message : 'An error occurred';
            });
    },
});

export default teacherDashboardSlice.reducer;
