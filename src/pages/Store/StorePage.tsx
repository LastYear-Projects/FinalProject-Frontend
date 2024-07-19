import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Box, useTheme } from '@mui/material';
import { useStore } from '../../store/store';
import { onKeyPress } from '../../utils/utils';
import LoadingSection from './sections/LoadingSection';
import StoreInfoSection from './sections/StoreInfoSection';
import CreditCardListSection from './sections/CreditCardListSection';
import { fetchStores } from '../../hooks/useStores';

const mockCreditCards = [
  {
    cardName: 'Bank|360 VISA',
    background: '#af87e7',
    textColor: '#ffffff',
    cardId: '1',
    pointValue: 5,
  },
  {
    cardName: 'הכרטיס של בנק',
    background: '#f0a30a',
    textColor: '#ffffff',
    cardId: '2',
    pointValue: 4,
  },
  {
    cardName: 'Bank|360 Mastercard',
    background: '#2d2d2d',
    textColor: '#ffffff',
    cardId: '3',
    pointValue: 3,
  },
];

const StorePage = () => {
  const { storeId, transactionPrice } = useParams();
  const [price, setPrice] = useState(transactionPrice);
  const [isLoading, setIsLoading] = useState(true);

  const currentStore = useStore((state) => state.getStoreById(storeId ?? ''));
  const setStores = useStore((state) => state.setStores);

  const theme = useTheme();
  const { t } = useTranslation();

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value);
  };

  const getAlgorithmResult = async () => {
    // TODO: Call the algorithm API and setIsLoading.
  };

  useEffect(() => {
    getAlgorithmResult();
  }, [price]);

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
        <LoadingSection theme={theme} t={t} />
      ) : (
        <>
          <StoreInfoSection
            store={currentStore}
            price={price}
            handlePriceChange={handlePriceChange}
            getAlgorithmResult={() => getAlgorithmResult()}
            onKeyPress={(e) => onKeyPress(e, 'Enter', getAlgorithmResult)}
            t={t}
          />
          <CreditCardListSection creditCards={mockCreditCards} />
        </>
      )}
    </Box>
  );
};

export default StorePage;
