import { configureStore } from '@reduxjs/toolkit';
import calcSlice from './slices/calc-slices';
import formSlice from './slices/form-slices';

export const store = configureStore({
  reducer: {
    calc: calcSlice,
    form: formSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
