import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const storedPayloadString = localStorage.getItem("userPayload");

const storedPayload = JSON.parse(storedPayloadString);
const token = storedPayload?.token;


const initialState = {
    creating: false,
    error: null,
};


export const createSocial = createAsyncThunk(
    'social/createProfile',
    async (socialData, { rejectWithValue }) => {
        console.log(socialData,"obj");
        try {
            const response = await axios.post('http://localhost:8080/api/updateSocialProfile', socialData, {
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
