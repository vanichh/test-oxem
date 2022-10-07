import { createSlice } from '@reduxjs/toolkit';
import { monthlyPayment as payment } from 'util/monthly-payment';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CalcState {
  carCost: number; // Стоимость автомобиля
  initialPercent: number; // Первоначальный взнос %
  initialSum: number; // Первоначальный взнос сумма
  sumContract: number; // Сумма договора лизинга
  monthly: number; // Срок лизинга
  monthlyPayment: number; // Ежемесячный платеж
}

const carCost = 1000000;
const monthly = 10;
const initialSum = carCost * 0.1;
const monthlyPayment = payment(carCost, initialSum, monthly);
const sumContract = initialSum + monthly * monthlyPayment;

const initialState: CalcState = {
  carCost,
  initialPercent: 10,
  initialSum,
  sumContract,
  monthly,
  monthlyPayment,
};

export const calcSlice = createSlice({
  name: 'calc',
  initialState,
  reducers: {
    setCarCost: (state, { payload }: PayloadAction<number>) => {
      if (payload >= 1000000 && payload <= 6000000) {
        state.carCost = payload;
      }
      state.initialSum = Math.ceil((state.initialPercent / 100) * payload);
      state.monthlyPayment = payment(
        state.carCost,
        state.initialSum,
        state.monthly
      );
      state.sumContract =
        state.initialSum + state.monthly * state.monthlyPayment;
    },
    setInitialPercent: (state, { payload }: PayloadAction<number>) => {
      state.initialPercent = payload;
      state.initialSum = Math.ceil((payload / 100) * state.carCost);
      state.monthlyPayment = payment(
        state.carCost,
        state.initialSum,
        state.monthly
      );
      state.sumContract =
        state.initialSum + state.monthly * state.monthlyPayment;
    },
    setMonthlyPayment: (state, { payload }: PayloadAction<number>) => {
      if (payload >= 13 && payload <= 60) {
        state.monthly = payload;
      }
      state.monthlyPayment = payment(
        state.carCost,
        state.initialSum,
        state.monthly
      );
      state.sumContract =
        state.initialSum + state.monthly * state.monthlyPayment;
    },
    setSumContract: (state) => {
      state.sumContract = state.initialSum + state.monthly;
      state.monthlyPayment = payment(
        state.carCost,
        state.initialSum,
        state.monthly
      );
      state.sumContract =
        state.initialSum + state.monthly * state.monthlyPayment;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setCarCost, () => {
        // console.log(1);
      })
      .addDefaultCase((state) => {
        // console.log(1);
      });
  },
});

export const { setCarCost, setInitialPercent, setMonthlyPayment } =
  calcSlice.actions;

export default calcSlice.reducer;
