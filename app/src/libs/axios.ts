import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.18:3000',
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    console.log('error request axios', error);
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.log('error response axios', error);
    return Promise.reject(error);
  },
);

export default api;
