import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import {
  Box,
  CircularProgress,
  Typography,
  Button,
  TextField,
  useTheme,
  Grid,
  CardMedia,
} from '@mui/material';
import CreditCard from '../../component/creditCard/CreditCard';
import { useTranslation } from 'react-i18next';

const mockCreditCards = [
  {
    cardName: 'Bank|360 VISA',
    background: '#af87e7',
    textColor: '#ffffff',
    cardId: 1,
    cashback: 5,
  },
  {
    cardName: 'הכרטיס של בנק',
    background: '#f0a30a',
    textColor: '#ffffff',
    cardId: 2,
    cashback: 4,
  },
  {
    cardName: 'Bank|360 Mastercard',
    background: '#2d2d2d',
    textColor: '#ffffff',
    cardId: 3,
    cashback: 3,
  },
];

const StorePage = () => {
  const { storeId, transactionPrice } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [price, setPrice] = useState(transactionPrice);
  const theme = useTheme();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchStore = async () => {
      console.log('Fetch ', storeId);
      // setIsLoading(false);
    };
    fetchStore();
  }, [storeId]);

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(4),
      }}
    >
      {isLoading ? (
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
          <CircularProgress sx={{ color: theme.palette.background.default }} />
        </Box>
      ) : (
        <>
          <img src='https://picsum.photos/200' alt='Store Logo' width={200} />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginTop: theme.spacing(2),
              gap: theme.spacing(2),
            }}
          >
            <TextField
              id='price'
              label={t('Transaction Price')}
              type='number'
              value={price}
              onChange={handlePriceChange}
            />
            <Button variant='contained' color='primary'>
              {t('Update price')}
            </Button>
          </Box>
          <Grid marginTop={2} container rowGap={2} columnGap={2}>
            {mockCreditCards?.map((card, index) => (
              <Grid
                item
                xs={12}
                key={card.cardName + index}
                display='flex'
                justifyContent='center'
              >
                <CreditCard {...card} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default StorePage;
