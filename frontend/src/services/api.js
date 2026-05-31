import axios from 'axios';

const api = axios.create({
  baseURL: 'https://prdify-backend.onrender.com/api', // Should ideally come from env
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
