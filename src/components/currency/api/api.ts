import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../api/axosInstances';
import { CurrencyParams } from './types';

export const getAllCurrency = createAsyncThunk(
  'currency/currency',
  async ({ from }: CurrencyParams) => {
    const response = await api.get('fetch-all', {
      params: {
        from,
        api_key: process.env.REACT_APP_API_KEY,
      },
    });
    return response.data;
  },
);
