import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Should ideally come from env
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
