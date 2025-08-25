import axios, { type AxiosResponse } from 'axios';

const apiUrl = `${import.meta.env.VITE_API}`;

const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

class BadResponseFormatError extends Error {
  constructor(response: AxiosResponse) {
    super(`Malformed response: ${response.headers['content-type']}`);
  }
}

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.headers['content-type'] !== 'application/json') {
      throw new BadResponseFormatError(response);
    }
    return response;
  },
  (error) => {
    console.error('API call failed:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
