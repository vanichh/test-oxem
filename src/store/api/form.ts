import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from 'util/constants';

export const formApi = createAsyncThunk('calc', async (thunkAPI: any) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(thunkAPI),
  });
  const data = await response.json();
  return data;
});
