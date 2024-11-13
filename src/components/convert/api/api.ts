import { api } from '../../../api/axosInstances';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ConvertParams } from './types';

export const getCurrencyConvert = createAsyncThunk(
  'currency/convert',
  async ({ from, to, amount }: ConvertParams) => {
    const response = await api.get('convert', {
      params: {
        from,
        to,
        amount,
        api_key: process.env.REACT_APP_API_KEY,
      },
    });
    return response.data;
  },
);
