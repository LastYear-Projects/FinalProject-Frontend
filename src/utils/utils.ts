import { Bounce, toast, ToastOptions } from 'react-toastify';
import { ToastifyProps } from '../globalTypes';

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
