import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  CircularProgress,
  Grid,
  styled,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import StoreCard, { StoreCardProps } from '../../component/storeCard/StoreCard';
import { useStoresQuery } from '../../hooks/useStores';
import { useStore } from '../../store/store';

const FlexedBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: theme.spacing(3),
}));

const GridContainer = styled(Grid)(() => ({
  maxWidth: '85rem',
  display: 'flex',
  justifyContent: 'center',
}));

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
        const lowerTitle = store.businessName.toLowerCase();
        const lowerCategory = store.businessCategory.toLowerCase();

        return (
          lowerTitle.includes(lowerValue) || lowerCategory.includes(lowerValue)
        );
      })
    );
  };

  return isLoading ? (
    <CircularProgress sx={{ color: theme.palette.background.default }} />
  ) : (
    <BoxContainer>
      <StyledTextField
        id='standard-basic'
        label={`${t('Search')}...`}
        variant='standard'
        onChange={handleFilterData}
      />
      <FlexedBox>
        <GridContainer container rowSpacing={6} columnSpacing={6}>
          {filteredData.map((storeCardData, index) => (
            <Grid item key={index}>
              <StoreCard key={index} {...storeCardData} />
            </Grid>
          ))}
          {stores?.length === 0 && filteredData.length === 0 && (
            <Typography variant='h4'>{`${t('No stores found')}...`}</Typography>
          )}
        </GridContainer>
      </FlexedBox>
    </BoxContainer>
  );
};

export default HomePage;
