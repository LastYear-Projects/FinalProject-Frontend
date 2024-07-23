import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingSection = ({ theme, t }) => (
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
      {t('Waiting for algorithm result...')}
    </Typography>
    <CircularProgress sx={{ color: theme.palette.secondary.contrastText }} />
  </Box>
);

export default LoadingSection;
