import { Box, Typography } from '@mui/material';
import Loader from '../../../component/loader/Loader';

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
    <Loader />
  </Box>
);

export default LoadingSection;
