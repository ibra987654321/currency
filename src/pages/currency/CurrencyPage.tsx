import React, { useEffect, useState } from 'react';
import { AppDispatch, RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, InputLabel, MenuItem, Select } from '@mui/material';
import { getAllCurrency } from '../../components/currency/api/api';

export const CurrencyPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const {
    results,
    loading,
  }: {
    base: string;
    loading: boolean;
    results: Record<string, number>;
  } = useSelector((state: RootState) => state.currency);

  const [fromCurrency, setFromCurrency] = useState<string>('USD');

  useEffect(() => {
    dispatch(getAllCurrency({ from: fromCurrency }));
  }, [dispatch, fromCurrency]);

  return (
    <div>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Currency Usage
          </h1>
          <div>
            <InputLabel id="demo-simple-select-label">From</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={fromCurrency}
              label="From"
              disabled={loading}
              onChange={(e) => setFromCurrency(e.target.value)}
            >
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="KGS">KGS</MenuItem>
              <MenuItem value="RUB">RUB</MenuItem>
            </Select>
          </div>
        </div>
      </header>
      {loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <CircularProgress />
        </div>
      ) : (
        <div className="container mx-auto grid grid-cols-12 gap-2 mt-4">
          {Object.entries(results).map(([key, value]) => (
            <div key={key} className="col-span-2 border-2 p-2 rounded-xl">
              {key}: {Math.round(value).toFixed(2)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
