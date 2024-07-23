import React from 'react';
import { useTheme, CircularProgress } from '@mui/material';

export type LoaderProps = {
  isLoading: boolean;
} & React.PropsWithChildren;

const Loader = ({ isLoading, children }: LoaderProps) => {
  const theme = useTheme();
  return isLoading ? (
    <CircularProgress sx={{ color: theme.palette.secondary.contrastText }} />
  ) : (
    children
  );
};

export default Loader;
