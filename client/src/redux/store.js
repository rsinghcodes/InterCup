import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';
import userReducer from './reducers/userSlice';
import adminSlice from './reducers/adminSlice';
import questionSlice from './reducers/questionSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    admin: adminSlice,
    question: questionSlice,
  },
});
