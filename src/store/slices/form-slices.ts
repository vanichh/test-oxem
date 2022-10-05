import { createSlice } from '@reduxjs/toolkit';
import { formApi } from '../api/form';

const initialState = {
  loading: false,
};

export const formSlices = createSlice({
  name: 'form',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(formApi.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(formApi.fulfilled, (state) => {
      state.loading = false;
    });
  },
});

export default formSlices.reducer;
