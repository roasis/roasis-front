import axios from 'axios';

const httpV1 = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + '/api/v1',
});

httpV1.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

httpV1.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default httpV1;
