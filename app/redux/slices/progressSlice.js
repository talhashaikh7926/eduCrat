import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
    creating: false,
    error: null,
};


export const updateProgress = createAsyncThunk(
    'progress/updateProgress',
    async (obj, { rejectWithValue }) => {
      try {
        
        const storedPayloadString = localStorage.getItem("userPayload");
        const storedPayload = JSON.parse(storedPayloadString);
        const token = storedPayload?.token;
        const id = storedPayload?.id;
        const response = await axios.post('http://localhost:8080/api/course/progress', {...obj, userId:id}, {
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
