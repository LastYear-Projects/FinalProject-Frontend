import {useTheme, CircularProgress, Box} from '@mui/material';

const Loader = () => {
  const theme = useTheme();
  return (
      <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
          }}
      >
        <CircularProgress sx={{ color: theme.palette.secondary.contrastText }} />
      </Box>
  );
};

export default Loader;
