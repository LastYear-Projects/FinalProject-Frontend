import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, TextField, Typography, useTheme } from '@mui/material';

import { useStore, useUser } from '../../../store/store';
import { fetchStores } from '../../../hooks/useStores';
import { onKeyPress, toastify } from '../../../utils/utils';
import Loader from '../../../component/loader/Loader';
import { useNavigate } from 'react-router';

const StoreInfoSection = ({
  storeId,
  onClick,
  transactionPrice,
  setTransactionPrice,
}: {
  storeId: string;
  onClick: () => void;
  transactionPrice: number;
  setTransactionPrice: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const currentStore = useStore((state) => state.getStoreById(storeId!));
  const setStores = useStore((state) => state.setStores);
  const { user } = useUser();
  const theme = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onSubmit = () => {
    if (transactionPrice === 0) {
      toastify({
        type: 'error',
        message: 'Please enter a valid price',
        position: 'top-center',
      });
      return;
    }
    onClick();
  };

  useEffect(() => {
    const init = async () => {
      if (!currentStore) {
        setIsLoading(true);
        try {
          const data = await fetchStores();
          setStores(data);
        } catch (error) {
          console.error('Failed to fetch stores:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };
    init();
  }, [currentStore, setStores]);

  return isLoading ? (
    <Loader />
  ) : (
    <Box
      sx={{
        marginTop: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <img src={currentStore?.businessImage} alt={currentStore?.businessName} />
      {user?.creditCards?.length === 0 ? (
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant='h6'
            sx={{
              textAlign: 'center',
              maxWidth: '17rem',
              marginBottom: theme.spacing(2),
              fontWeight: theme.typography.fontWeightBold,
            }}
          >
            {t('You need to add credit cards before using the algorithm')}
          </Typography>
          <Button
            onClick={() => navigate('/profile')}
            sx={{ marginTop: 4 }}
            variant='outlined'
          >
            {t('Profile Page')}
          </Button>
        </Box>
      ) : (
        <>
          <Typography sx={{ marginTop: 4 }} variant='h4'>
            {t('Enter Transaction Price')}
          </Typography>
          <TextField
            onKeyDown={(e) => onKeyPress(e, 'Enter', onSubmit)}
            sx={{ marginTop: 4 }}
            id='outlined-basic'
            label={t('Enter Transaction Price')}
            variant='outlined'
            type='number'
            value={transactionPrice}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value >= 0) {
                setTransactionPrice(value);
              }
            }}
          />
          <Button onClick={onSubmit} sx={{ marginTop: 4 }} variant='outlined'>
            {t('Go For It')}
          </Button>
        </>
      )}
    </Box>
  );
};

export default StoreInfoSection;
