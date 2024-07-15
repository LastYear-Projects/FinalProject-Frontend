import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Box, CircularProgress, Typography, useTheme } from '@mui/material';

const StorePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { storeId, transactionPrice } = useParams();
  const theme = useTheme();

  useEffect(() => {
    const fetchStore = async () => {
      console.log('Fetch ', storeId);
      //   setIsLoading(false);
    };
    fetchStore();
  }, [storeId]);

  return (
    isLoading && (
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
          {'Waiting for algorithm result...'}
        </Typography>
        <CircularProgress sx={{ color: theme.palette.background.default }} />
      </Box>
    )
  );
};

export default StorePage;
