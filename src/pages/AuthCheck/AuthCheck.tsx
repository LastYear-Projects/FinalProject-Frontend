// AuthCheck.tsx
import React, { useEffect, useState } from 'react';
import { useIsAuth, useUser } from '../../store/store';
import axiosRequest from '../../utils/restApi';
import { toastify } from '../../utils/utils';
import Loader from '../../component/loader/Loader';

const AuthCheck: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const setIsAuthenticate = useIsAuth((state) => state.setIsAuthenticate);
  const { setUser } = useUser();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axiosRequest({
          url: '/auth/',
          method: 'GET',
        });
        if (!response?.data) return;
        setIsAuthenticate(!!token);
        setUser(response.data);
      } catch (e: any) {
        toastify({ type: 'error', message: e?.message, position: 'top-right' });
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [setIsAuthenticate, setUser]);

  if (isLoading) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default AuthCheck;
