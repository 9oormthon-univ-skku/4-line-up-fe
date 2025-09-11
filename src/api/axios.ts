import axios, { type AxiosResponse } from 'axios';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

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

const parseDatesAndNewlines = (data: any): any => {
  if (typeof data !== 'object' || data === null) {
    return data;
  }
  if (Array.isArray(data)) {
    return data.map((e) => parseDatesAndNewlines(e));
  }
  const newData: Record<string, any> = {};
  for (const k in data) {
    if (Object.prototype.hasOwnProperty.call(data, k)) {
      const v = data[k];
      if (
        typeof v === 'string' &&
        dayjs(
          v,
          ['YYYY-MM-DDTHH:mm:ss', 'YYYY-MM-DDTHH:mm:ss.SSS'],
          true
        ).isValid()
      ) {
        newData[k] = dayjs(v); // parse string to date
      } else if (typeof v === 'string') {
        newData[k] = v.replaceAll('\\n', '\n'); // newline
      } else if (typeof v === 'object') {
        newData[k] = parseDatesAndNewlines(v); // recursion
      } else {
        newData[k] = v;
      }
    }
  }
  return newData;
};

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.headers['content-type'] !== 'application/json') {
      throw new BadResponseFormatError(response);
    }
    response.data = parseDatesAndNewlines(response.data);
    return response;
  },
  (error) => {
    console.error('API call failed:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
