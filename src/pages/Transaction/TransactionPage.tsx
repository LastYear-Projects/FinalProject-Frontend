import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Box, CircularProgress, useTheme, styled } from '@mui/material';
import { getAlgorithmResult, getCreditCard } from '../../utils/utils';
import { useStore } from '../../store/store';
import { fetchStores } from '../../hooks/useStores';
import { CreditCardType } from '../../globalTypes';
import LoadingSection from './sections/LoadingSection';
import CreditCardListSection from './sections/CreditCardListSection';
import StoreInfoSection from './sections/StoreInfoSection';

const StyledBox = styled(Box)(() => ({
  marginTop: 4,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
}));

const TransactionPage = () => {
  const { storeId } = useParams();
  const [transactionPrice, setTransactionPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isAlgorithmLoading, setIsAlgorithmLoading] = useState(false);
  const [creditCards, setCreditCards] = useState<CreditCardType[]>([]);

  const currentStore = useStore((state) => state.getStoreById(storeId!));
  const setStores = useStore((state) => state.setStores);

  const theme = useTheme();
  const { t } = useTranslation();

  const handleGetAlgorithmResult = async () => {
    setCreditCards([]);
    setIsAlgorithmLoading(true);

    const data = await getAlgorithmResult(transactionPrice, storeId!);

    const results: Promise<CreditCardType>[] = data?.map(async (card) => {
      const creditCard = await getCreditCard(card.creditCardId);
      return {
        ...creditCard,
        grade: card.grade,
        profit: card.profit,
      };
    });

    setCreditCards(await Promise.all(results));
    setIsAlgorithmLoading(false);
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
    <CircularProgress sx={{ color: theme.palette.secondary.contrastText }} />
  ) : (
    <StyledBox>
      <StoreInfoSection
        transactionPrice={transactionPrice}
        setTransactionPrice={setTransactionPrice}
        storeId={storeId!}
        onClick={handleGetAlgorithmResult}
      />
      {isAlgorithmLoading ? (
        <LoadingSection
          theme={theme}
          t={t}
          message='Waiting for algorithm result'
        />
      ) : (
        creditCards.length > 0 && (
          <CreditCardListSection creditCards={creditCards} />
        )
      )}
    </StyledBox>
  );
};

export default TransactionPage;
