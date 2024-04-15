import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
    fetching: false,
    enrollCource: [],
    error: null,
};

export const fetchErollStd = createAsyncThunk(
    'profile/fetchErollStd',
    async (_, { rejectWithValue }) => {
        try {
            const storedPayloadString = localStorage.getItem("userPayload");
            const storedPayload = JSON.parse(storedPayloadString);
            const token = storedPayload?.token;
            const id = storedPayload?.id;
            const response = await axios.post('http://localhost:8080/api/enroll', { studentId: id }, {
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

const getEnrollSlice = createSlice({
    name: 'enrollStudent',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchErollStd.pending, (state) => {
                state.fetching = true;
                state.error = null;
            })
            .addCase(fetchErollStd.fulfilled, (state, action) => {
                state.fetching = false;
                state.enrollCource = action.payload;
                state.error = null;
            })
            .addCase(fetchErollStd.rejected, (state, action) => {
                state.fetching = false;
                state.error = action.payload ? action.payload.message : 'An error occurred';
            });
    },
});

export default getEnrollSlice.reducer;
