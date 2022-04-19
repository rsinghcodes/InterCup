import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchQuizzes = createAsyncThunk('quiz/fetch', async (thunkAPI) => {
  try {
    const response = await axios.get('/api/quiz');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const createQuiz = createAsyncThunk(
  'quiz/new',
  async (questionData, thunkAPI) => {
    try {
      const response = await axios.post('/api/quiz/new', questionData, {
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

export const deleteQuiz = createAsyncThunk(
  'quiz/delete',
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`/api/quiz/${id}`, {
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

// update Quiz
export const updateQuiz = createAsyncThunk(
  'quiz/update',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.put(`/api/quiz/${userData._id}`, userData, {
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

const quizSlice = createSlice({
  name: 'quiz',
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    quizzes: [],
    error: {},
  },
  reducers: {},
  extraReducers: {
    [fetchQuizzes.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.quizzes = payload;
    },
    [fetchQuizzes.pending]: (state) => {
      state.isLoading = true;
    },
    [createQuiz.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.quizzes = [...state.quizzes, payload];
    },
    [createQuiz.pending]: (state) => {
      state.isLoading = true;
    },
    [createQuiz.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.error = payload;
    },
    [updateQuiz.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.quizzes = state.quizzes.map((x) =>
        x._id === payload._id ? payload : x
      );
    },
    [updateQuiz.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteQuiz.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.quizzes = state.quizzes.filter((x) => x._id !== payload._id);
    },
    [deleteQuiz.pending]: (state) => {
      state.isLoading = true;
    },
  },
});

export const quizSelector = (state) => state.quiz;

export default quizSlice.reducer;
