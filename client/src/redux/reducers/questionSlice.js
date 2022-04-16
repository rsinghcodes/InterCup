import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchQuestions = createAsyncThunk(
  'question/fetch',
  async (thunkAPI) => {
    try {
      const response = await axios.get('/api/questions');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createQuestion = createAsyncThunk(
  'question/createQuestion',
  async (questionData, thunkAPI) => {
    try {
      const response = await axios.post('/api/questions/new', questionData, {
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

const questionSlice = createSlice({
  name: 'question',
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    questions: [],
    error: {},
  },
  reducers: {},
  extraReducers: {
    [fetchQuestions.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.questions = payload;
    },
    [fetchQuestions.pending]: (state) => {
      state.isLoading = true;
    },
    [createQuestion.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.questions = [...state.questions, payload];
    },
    [createQuestion.pending]: (state) => {
      state.isLoading = true;
    },
    [createQuestion.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.error = payload;
    },
  },
});

export const questionSelector = (state) => state.question;

export default questionSlice.reducer;
