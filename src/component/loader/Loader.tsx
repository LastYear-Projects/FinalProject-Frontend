import { useTheme, CircularProgress } from '@mui/material';

const Loader = () => {
  const theme = useTheme();
  return (
    <CircularProgress sx={{ color: theme.palette.secondary.contrastText }} />
  );
};

export default Loader;
