import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, styled, TextField, useTheme } from '@mui/material';
import { StoreCardProps } from '../../component/storeCard/StoreCard';
import { useStoresQuery } from '../../hooks/useStores';
import { useStore } from '../../store/store';
import StoresSection from './sections/StoresSection';
import LoadingSection from '../Transaction/sections/LoadingSection';

const BoxContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
}));

const StyledTextField = styled(TextField)(() => ({
  marginBottom: '1.5rem',
  width: '10rem',
}));

const HomePage = () => {
  const { isLoading } = useStoresQuery();
  const stores = useStore((state) => state.stores);
  const theme = useTheme();
  const [filteredData, setFilteredData] = useState<StoreCardProps[]>([]);

  const { t } = useTranslation();

  useEffect(() => {
    setFilteredData(stores);
  }, [stores]);

  const handleFilterData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const lowerValue = event?.target.value?.toLowerCase();

    setFilteredData(
      stores.filter((store) => {
        console.log(store);

        const lowerTitle = store?.businessName?.toLowerCase();
        const lowerCategory = store?.businessCategory?.toLowerCase();

        return (
          lowerTitle?.includes(lowerValue) ||
          lowerCategory?.includes(lowerValue)
        );
      })
    );
  };

  if (isLoading || !stores) {
    return <LoadingSection theme={theme} t={t} />;
  }

  return (
    <BoxContainer>
      <StyledTextField
        id='standard-basic'
        label={`${t('Search')}...`}
        variant='standard'
        onChange={handleFilterData}
      />
      <StoresSection filteredData={filteredData} />
    </BoxContainer>
  );
};

export default HomePage;
