import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { message, notification } from 'antd';

import axios from 'axios';

// phân trang với antd dựa vào totalElements
const initialState = {
  content: [],
  total: 0,
  number: 0,
  size: 5,
  isLoading: false,
};

export const fetchAllUser = createAsyncThunk('users/fetchAllUser', async ({ page }) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/v1/users?page=${page}`);
    return response.data;
  } catch (err) {
    notification.error({ message: err.message, duration: 3 });
  }
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    changePage: (state, action) => {
      state.number = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // trạng tái
      .addCase(fetchAllUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.content = action.payload.content;
        state.total = action.payload.totalElements;
        state.number = action.payload.number;
        state.size = action.payload.size;
      })
      .addCase(fetchAllUser.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { changePage } = userSlice.actions;

export default userSlice.reducer;
