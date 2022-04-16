import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUsersProfile = createAsyncThunk(
  'admin/getUsersProfile',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/api/admin/get-users', {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    users: [],
    error: {},
  },
  reducers: {},
  extraReducers: {
    [getUsersProfile.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.users = payload;
    },
    [getUsersProfile.pending]: (state) => {
      state.isLoading = true;
    },
    [getUsersProfile.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.error = payload;
    },
  },
});

export const adminSelector = (state) => state.admin;

export default adminSlice.reducer;
