import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const getBaseUrl = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  return baseUrl;
};

/**
 * Generic Axios request function
 * @param url - The URL to send the request to
 * @param method - The HTTP method to use (GET, POST, PUT, DELETE, etc.)
 * @param data - The request payload (optional)
 * @returns A promise that resolves to the Axios response
 */
const axiosRequest = async <T>({
  url,
  method,
  data,
}: {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: T;
}): Promise<AxiosResponse> => {
  try {
    const token = localStorage.getItem('token');

    const requestConfig: AxiosRequestConfig = {
      url: `${getBaseUrl()}${url}`,
      method,
      data,
      headers: {
        Authorization: token,
      },
    };
    const response = await axios(requestConfig);
    return response;
  } catch (e: any) {
    console.error(e?.message);
  }
  return {} as AxiosResponse;
};

export default axiosRequest;
