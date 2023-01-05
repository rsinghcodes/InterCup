import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';
import userReducer from './reducers/userSlice';
import adminSlice from './reducers/adminSlice';
import quizSlice from './reducers/quizSlice';
import questionSlice from './reducers/questionSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    admin: adminSlice,
    question: questionSlice,
    quiz: quizSlice,
  },
});
