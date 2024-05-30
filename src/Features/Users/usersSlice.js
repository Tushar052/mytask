import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {  
  const response = await axios.get('https://jsonplaceholder.typicode.com/users');
  return response.data;
});

// Async thunk for updating a user
export const updateUser = createAsyncThunk('users/updateUser', async ({ id, updatedUser }) => {
  try {
    const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updatedUser);
    return response.data;
  } catch (error) {
    throw Error(error.response.data.error);
  }
});

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    deleteUser: (state, action) => {               // deleteUser based on id
      const userId = action.payload;
      state.users = state.users.filter(user => user.id !== userId);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {          // Checking status for fetching API Users
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Added reducers for handling updateUser
      .addCase(updateUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Find and update the user in the state array
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});
export const { deleteUser } = usersSlice.actions;
export default usersSlice.reducer;
