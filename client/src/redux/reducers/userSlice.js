import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getProfile = createAsyncThunk(
  'user/profile',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.get('/api/user/profile', {
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

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    user: {},
    error: {},
  },
  reducers: {},
  extraReducers: {
    [getProfile.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = payload;
    },
    [getProfile.pending]: (state) => {
      state.isLoading = true;
    },
    [getProfile.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.error = payload;
    },
  },
});

export const userSelector = (state) => state.user;

export default userSlice.reducer;
