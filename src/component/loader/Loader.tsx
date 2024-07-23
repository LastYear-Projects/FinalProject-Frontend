import React from 'react';
import { useTheme, CircularProgress } from '@mui/material';

export type LoaderProps = {
  isLoading: boolean;
} & React.PropsWithChildren;

const Loader = ({ isLoading, children }: LoaderProps) => {
  const theme = useTheme();
  return isLoading ? (
    <CircularProgress sx={{ color: theme.palette.background.paper }} />
  ) : (
    children
  );
};

export default Loader;
