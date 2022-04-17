import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { deleteUserProfile, updateUserProfile } from './userSlice';

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

export const createUser = createAsyncThunk(
  'user/create',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post('/api/admin/add-user', userData, {
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
    [createUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.users = [...state.users, payload.user];
    },
    [createUser.pending]: (state) => {
      state.isLoading = true;
    },
    [createUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.error = payload;
    },
    [updateUserProfile.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.users = state.users.map((x) =>
        x._id === payload.user._id ? payload.user : x
      );
    },
    [updateUserProfile.pending]: (state) => {
      state.isLoading = true;
    },
    [updateUserProfile.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.error = payload;
    },
    [deleteUserProfile.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.users = state.users.filter((x) => x._id !== payload.user._id);
    },
    [deleteUserProfile.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteUserProfile.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.error = payload;
    },
  },
});

export const adminSelector = (state) => state.admin;

export default adminSlice.reducer;
