import { configureStore } from '@reduxjs/toolkit';
import ConvertReduce from './components/convert/model/convertSlice';
import CurrencyReduce from './components/currency/model/currencySlice';
export const store = configureStore({
  reducer: {
    convert: ConvertReduce,
    currency: CurrencyReduce,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
