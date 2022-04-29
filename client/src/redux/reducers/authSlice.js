import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../../utils/setAuthToken';
import { deleteUserProfile, updateUserProfile } from './userSlice';

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post('/api/user/register', userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post('/api/user/login', userData);
      const { accessToken } = response.data;

      setAuthToken(accessToken);
      localStorage.setItem('token', accessToken);
      // Decode token to get user data
      const decoded = jwt_decode(accessToken);
      // Return decoded user
      return decoded;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const loginAdmin = createAsyncThunk(
  'admin/loginAdmin',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post('/api/admin/login', userData);
      const { accessToken } = response.data;

      setAuthToken(accessToken);
      localStorage.setItem('token', accessToken);
      // Decode token to get user data
      const decoded = jwt_decode(accessToken);
      // Return decoded user
      return decoded;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const verifyUserEmail = createAsyncThunk(
  'user/verifyEmail',
  async ({ userId, tokenId }, thunkAPI) => {
    try {
      const response = await axios.get(
        `/auth/user/${userId}/verify/${tokenId}`
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    isAuthenticated: false,
    user: {},
    error: {},
    message: '',
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
    setCurrentUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: {
    [loginUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.isSuccess = true;
      state.user = payload;
    },
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.error = payload;
    },
    [loginAdmin.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.isSuccess = true;
      state.user = payload;
    },
    [loginAdmin.pending]: (state) => {
      state.isLoading = true;
    },
    [loginAdmin.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.error = payload;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = payload.message;
    },
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.error = payload;
    },
    [verifyUserEmail.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = payload;
    },
    [verifyUserEmail.pending]: (state) => {
      state.isLoading = true;
    },
    [verifyUserEmail.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.error = payload;
    },
    [deleteUserProfile.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;

      if (state.user.role === 'user') {
        state.isAuthenticated = false;
        state.user = null;
        localStorage.removeItem('token');
      }
    },
    [deleteUserProfile.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteUserProfile.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.error = payload;
    },
    [updateUserProfile.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.isSuccess = true;

      if (state.user.role === 'user') {
        setAuthToken(payload.accessToken);
        localStorage.setItem('token', payload.accessToken);
        state.user = jwt_decode(payload.accessToken);
      }
    },
    [updateUserProfile.pending]: (state) => {
      state.isLoading = true;
    },
    [updateUserProfile.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.error = payload;
      state.isAuthenticated = false;
    },
  },
});

export const { logout, setCurrentUser } = authSlice.actions;
export const authSelector = (state) => state.auth;

export default authSlice.reducer;
