import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CurrencyResponseDto } from './types';
import { getAllCurrency } from '../api/api';

const initialState = {
  base: '',
  results: {},
  loading: false,
  error: null,
};

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    clearCurrency: (state) => {
      state.base = '';
      state.results = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCurrency.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllCurrency.fulfilled,
        (state, action: PayloadAction<CurrencyResponseDto>) => {
          state.results = action.payload.results;
          state.base = action.payload.base;
          state.loading = false;
        },
      )
      .addCase(getAllCurrency.rejected, (state, action) => {
        state.loading = false;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrency } = currencySlice.actions;
export default currencySlice.reducer;
