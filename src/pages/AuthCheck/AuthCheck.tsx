// AuthCheck.tsx
import React, { useEffect, useState } from 'react';
import { useIsAuth } from '../../store/store';
import { CircularProgress, useTheme } from '@mui/material';

const AuthCheck: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme();
  const setIsAuthenticate = useIsAuth((state) => state.setIsAutenticate);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      setIsAuthenticate(!!token);
      setIsLoading(false);
    };

    checkAuth();
  }, [setIsAuthenticate]);

  if (isLoading) {
    return (
      <CircularProgress sx={{ color: theme.palette.background.default }} />
    );
  }

  return <>{children}</>;
};

export default AuthCheck;
