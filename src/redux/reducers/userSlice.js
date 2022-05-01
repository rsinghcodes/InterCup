import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getProfile = createAsyncThunk(
  'user/profile',
  async (_, thunkAPI) => {
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

export const deleteUserProfile = createAsyncThunk(
  'user/deleteProfile',
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`/api/user/${id}`, {
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

export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.put(`/api/user/${userData._id}`, userData, {
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

export const addFavoriteQues = createAsyncThunk(
  'user/addFavorite',
  async (questionId, thunkAPI) => {
    try {
      const response = await axios.patch(
        '/api/user/add-favorite',
        { questionId },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const removeFavoriteQues = createAsyncThunk(
  'user/removeFavorite',
  async (questionId, thunkAPI) => {
    try {
      const response = await axios.patch(
        '/api/user/delete-favorite',
        { questionId },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

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
  reducers: {
    removeUser: (state) => {
      state.user = null;
    },
  },
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
    [deleteUserProfile.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = null;
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
      state.isSuccess = true;
      state.user = payload.user;
    },
    [updateUserProfile.pending]: (state) => {
      state.isLoading = true;
    },
    [updateUserProfile.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.error = payload;
    },
    [addFavoriteQues.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = payload;
    },
    [removeFavoriteQues.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = payload;
    },
  },
});

export const { removeUser } = userSlice.actions;
export const userSelector = (state) => state.user;

export default userSlice.reducer;
