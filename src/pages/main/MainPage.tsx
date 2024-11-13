import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { useEffect, useState } from 'react';
import { getCurrencyConvert } from '../../components/convert/api/api';
import {
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  SelectChangeEvent,
  TextField,
  CircularProgress,
} from '@mui/material';

export function MainPage() {
  const dispatch: AppDispatch = useDispatch();
  const {
    result,
    loading,
  }: {
    base: string;
    amount: number;
    loading: boolean;
    result: Record<string, number>;
  } = useSelector((state: RootState) => state.convert);
  const response = Object.keys(result)[0];

  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('KGS');
  const [amount, setAmount] = useState<string>('1');

  const useFetch = () => {
    dispatch(
      getCurrencyConvert({
        from: fromCurrency,
        to: toCurrency,
        amount: amount,
      }),
    );
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      useFetch();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [dispatch, fromCurrency, toCurrency, response, amount]);

  const handleChangeFrom = async (event: SelectChangeEvent) => {
    setFromCurrency(event.target.value);
  };
  const handleChangeTo = async (event: SelectChangeEvent) => {
    setToCurrency(event.target.value);
  };

  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Dashboard
          </h1>
        </div>
      </header>
      {loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <CircularProgress />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 container mx-auto mt-4">
          <div className="grid grid-cols-2 gap-6">
            <FormControl>
              <TextField
                id="outlined-basic"
                label="From"
                variant="outlined"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <InputLabel id="demo-simple-select-label">From</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={fromCurrency}
                label="From"
                onChange={handleChangeFrom}
              >
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="KGS">KGS</MenuItem>
                <MenuItem value="RUB">RUB</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <FormControl>
              <TextField
                id="outlined-basic"
                label="From"
                variant="outlined"
                value={result[response]}
              />
            </FormControl>
            <FormControl>
              <InputLabel id="demo-simple-select-label">To</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={toCurrency}
                label="To"
                onChange={handleChangeTo}
              >
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="KGS">KGS</MenuItem>
                <MenuItem value="RUB">RUB</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      )}
    </>
  );
}
