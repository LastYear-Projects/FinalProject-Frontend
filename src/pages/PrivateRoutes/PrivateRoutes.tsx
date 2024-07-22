import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useIsAuth } from '../../store/store';

const PrivateRoute = ({ children }: React.PropsWithChildren) => {
  const isAuthenticate = useIsAuth((state) => state.isAuthenticate);
  const setIsAuthenticate = useIsAuth((state) => state.setIsAutenticate);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticate(true);
    }
  }, [isAuthenticate, setIsAuthenticate]);

  return isAuthenticate ? children : <Navigate to='/signin' />;
};

export default PrivateRoute;
