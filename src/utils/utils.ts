import { Bounce, toast, ToastOptions } from 'react-toastify';
import { ToastifyProps } from '../globalTypes';
import axios from 'axios';
import { SignUpType } from '../pages/Signup/SignupPage';
import { useIsAuth } from '../store/store';

export const getBaseUrl = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  return baseUrl;
};

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
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjlkM2NhZjBiZDVmYzgzZmZiYmI0NWMiLCJpYXQiOjE3MjE2NTkxNjMsImV4cCI6MTcyNzY1OTEwM30.zd1CACVxP6DDvXDZ0lHLHgBIz9TJXDSRV52OCNJMsuo';
  try {
    const response = await axios.get(
      `${getBaseUrl()}/recommendation/?transactionAmount=${transactionAmount}&businessId=${businessId}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (e: any) {
    console.error(e?.message);
  }
};

export const getCreditCard = async (cardId: string) => {
  const response = await axios.get(`${getBaseUrl()}/cards/${cardId}`);
  return response.data;
};

export const convertToNumber = (item: string) => {
  if (!item) return '';
  return Number(item).toFixed(2);
};

export const handleRegister = async (data: SignUpType) => {
  try {
    const response = await axios.post(`${getBaseUrl()}/auth/register`, data);
    return response.status;
  } catch (e: any) {
    console.error(e?.message);
  }
};

export const handleLogin = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${getBaseUrl()}/auth/login`, {
      email,
      password,
    });
    const token = response.data.token;
    localStorage.setItem('token', token);
    toastify({
      type: 'success',
      message: 'Login successful',
      position: 'top-right',
    });
  } catch (e: any) {
    toastify({
      type: 'error',
      message: e?.response?.data?.error,
      position: 'top-right',
    });
  }
};
