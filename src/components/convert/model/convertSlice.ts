import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ConvertResponseDto } from './types';
import { getCurrencyConvert } from '../api/api';

const initialState = {
  base: '',
  amount: 0,
  result: {},
  loading: false,
  error: null,
};

const convertSlice = createSlice({
  name: 'convert',
  initialState,
  reducers: {
    clearConvert: (state) => {
      state.amount = 0;
      state.result = {};
      state.base = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrencyConvert.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getCurrencyConvert.fulfilled,
        (state, action: PayloadAction<ConvertResponseDto>) => {
          state.amount = action.payload.amount;
          state.result = action.payload.result;
          state.base = action.payload.base;
          state.loading = false;
        },
      )
      .addCase(getCurrencyConvert.rejected, (state, action) => {
        state.loading = false;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        state.error = action.payload as string;
      });
  },
});

export const { clearConvert } = convertSlice.actions;
export default convertSlice.reducer;
