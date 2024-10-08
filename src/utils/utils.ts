import { Bounce, toast, ToastOptions } from 'react-toastify';
import { ToastifyProps, UserType } from '../globalTypes';
import { SignUpType } from '../pages/Signup/SignupPage';
import axiosRequest from './restApi';
import { NavigateFunction } from 'react-router';

export const isHebrew = (text: string) => {
  return /[\u0590-\u05FF]/.test(text);
};

export const checkHebrewDirection = (
  title: string,
  businessCategory: string
) => {
  return {
    textAlign: isHebrew(title) ? 'right' : 'left',
    direction: isHebrew(businessCategory) ? 'rtl' : 'ltr',
  };
};

export const toastify = ({ type, message, position }: ToastifyProps) => {
  const options: ToastOptions = {
    position,
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: 'dark',
    transition: Bounce,
  };

  switch (type) {
    case 'error':
      toast.error(message, options);
      break;
    case 'info':
      toast.info(message, options);
      break;
    case 'success':
      toast.success(message, options);
      break;
    case 'warning':
      toast.warning(message, options);
      break;
    default:
      toast.error(message, options);
  }
};

export const onKeyPress = (
  e: React.KeyboardEvent,
  key: string,
  callback: () => void
) => {
  if (e.key === key) {
    callback();
  }
};

export const getAlgorithmResult = async (
  transactionAmount: number,
  businessId: string
) => {
  try {
    const response = await axiosRequest({
      url: `/recommendation/?transactionAmount=${transactionAmount}&businessId=${businessId}`,
      method: 'GET',
    });
    return response.data;
  } catch (e: any) {
    console.error(e?.message);
  }
};

export const getCreditCard = async (cardId: string) => {
  const response = await axiosRequest({
    url: `/cards/${cardId}`,
    method: 'GET',
  });
  return response.data;
};

export const convertToNumber = (item: string) => {
  if (!item) return '';
  return Number(item).toFixed(2);
};

export const handleRegister = async (data: SignUpType) => {
  try {
    const response = await axiosRequest({
      url: `/auth/register`,
      method: 'POST',
      data,
    });
    return response.status;
  } catch (e: any) {
    console.error(e?.message);
  }
};

export const handleLogin = async (email: string, password: string) => {
  try {
    const response = await axiosRequest({
      url: '/auth/login',
      method: 'POST',
      data: { email, password },
    });
    if (!response?.data?.token) {
      toastify({
        type: 'error',
        message: response?.data?.error,
        position: 'top-right',
      });
      return false;
    }

    const token = response.data.token;
    localStorage.setItem('token', token);
    toastify({
      type: 'success',
      message: 'Login successful',
      position: 'top-right',
    });
    return true;
  } catch (e: any) {
    console.log('here?');

    toastify({
      type: 'error',
      message: e?.response?.data?.error,
      position: 'top-right',
    });
  }
};

export const checkAuthStatus = async () => {
  const token = localStorage.getItem('token');
  if (!token) return false;
  return true;
};

export const onHandleSubmit = async ({
  email,
  password,
  setIsAuthenticate,
  setUser,
  navigate,
  reset,
}: {
  email: string;
  password: string;
  setIsAuthenticate: (isAuthenticate: boolean) => void;
  setUser: (user: UserType) => void;
  navigate: NavigateFunction;
  reset: any;
}) => {
  const isLoggedIn = await handleLogin(email, password);
  if (!isLoggedIn) return;
  setIsAuthenticate(true);

  const response = await axiosRequest({
    url: '/auth/',
    method: 'GET',
  });
  if (!response?.data) return;
  setUser(response.data);

  navigate('/');
  reset();
};

export const reverseHebrewInMixedText = (text: string): string => {
  const hebrewRegex = /[\u0590-\u05FF]/;
  const englishRegex = /[a-zA-Z]/;

  if (hebrewRegex.test(text) && englishRegex.test(text)) {
    return text.replace(/[\u0590-\u05FF]+/g, (hebrewMatch) => {
      return hebrewMatch.split('').reverse().join('');
    });
  }
  return text;
};
