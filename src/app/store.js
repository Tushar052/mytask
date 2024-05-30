// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../Features/Users/usersSlice';

const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

export default store;
