import React from 'react';
import { Navigate } from 'react-router-dom';
import { useIsAuth } from '../../store/store';

const PrivateRoute = ({ children }: React.PropsWithChildren) => {
  const isAuthenticate = useIsAuth((state) => state.isAuthenticate);

  return isAuthenticate ? children : <Navigate to='/signin' />;
};

export default PrivateRoute;
