import axios from 'axios';

export const api = axios.create({
  baseURL: `https://api.fastforex.io/`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
