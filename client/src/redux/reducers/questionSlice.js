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
  'question/new',
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

export const deleteQuestion = createAsyncThunk(
  'question/delete',
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`/api/questions/${id}`, {
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

// update Question
export const updateQuestion = createAsyncThunk(
  'question/update',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.put(
        `/api/questions/${userData._id}`,
        userData,
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

export const likeQues = createAsyncThunk(
  'question/like',
  async (questionId, thunkAPI) => {
    try {
      const response = await axios.patch('/api/questions/like', questionId, {
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

export const unlikeQues = createAsyncThunk(
  'question/unlike',
  async (questionId, thunkAPI) => {
    try {
      const response = await axios.patch('/api/questions/unlike', questionId, {
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
    [updateQuestion.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.questions = state.questions.map((x) =>
        x._id === payload._id ? payload : x
      );
    },
    [updateQuestion.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteQuestion.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.questions = state.questions.filter((x) => x._id !== payload._id);
    },
    [deleteQuestion.pending]: (state) => {
      state.isLoading = true;
    },
    [likeQues.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.questions = state.questions.map((x) =>
        x._id === payload._id ? payload : x
      );
    },
    [unlikeQues.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.questions = state.questions.map((x) =>
        x._id === payload._id ? payload : x
      );
    },
  },
});

export const questionSelector = (state) => state.question;

export default questionSlice.reducer;
