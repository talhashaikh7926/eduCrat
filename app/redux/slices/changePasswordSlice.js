import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const storedPayloadString = localStorage.getItem("userPayload");

const storedPayload = JSON.parse(storedPayloadString);
const token = storedPayload?.token;


const initialState = {
    creating: false,
    error: null,
};


export const changePassword = createAsyncThunk(
    'profile/createPassword',
    async (passwordData, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:8080/api/changePassword', passwordData, {
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

const passwordSlice = createSlice({
    name: 'password',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(changePassword.pending, (state) => {
                state.creating = true;
                state.error = null;
            })
            .addCase(changePassword.fulfilled, (state) => {
                state.creating = false;
                state.error = null;
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.creating = false;
                state.error = action.payload ? action.payload.message : 'An error occurred';
            });
    },
});

export default passwordSlice.reducer;
