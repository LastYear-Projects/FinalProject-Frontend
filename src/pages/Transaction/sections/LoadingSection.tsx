import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingSection = ({
  theme,
  t,
  message = '',
}: {
  message?: string;
  theme: any;
  t: any;
}) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '50vh',
      flexDirection: 'column',
    }}
  >
    <Typography
      variant='h6'
      sx={{
        marginBottom: theme.spacing(2),
        fontWeight: theme.typography.fontWeightBold,
      }}
    >
      {t(message)}
    </Typography>
    <CircularProgress sx={{ color: theme.palette.secondary.contrastText }} />
  </Box>
);

export default LoadingSection;
