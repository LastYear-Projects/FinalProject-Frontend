import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Grid, styled, TextField } from '@mui/material';
import StoreCard from '../../component/storeCard/StoreCard';

const defaultStoreCardData = [
  {
    businessImage:
      'https://atrium-targowek.pl/assets/webp-express/webp-images/doc-root/assets/uploads/2023/08/c384179a-7210-4984-97e1-7c261605625b.png.webp',
    title: 'זארה',
    businessCategory: 'ביגוד',
    id: 1,
  },
  {
    businessImage:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_Kmau53hrnqOIV_oen4ztf-rx5QR6xkAvuw&s',
    title: 'Mania Jeans',
    businessCategory: 'Clothing',
    id: 2,
  },
  {
    businessImage:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSECA50vJOqaxYtRVsA5o7XCAjjBkgYckOfaA&s',
    title: 'Replay',
    businessCategory: 'Clothing',
    id: 3,
  },
  {
    businessImage:
      'https://fox.co.il/cdn/shop/files/foxlogo1200.jpg?v=1708591989',
    title: 'Fox',
    businessCategory: 'Home',
    id: 4,
  },
];

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

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: '1.5rem',
  width: '10rem',
  '& .MuiInputLabel-root': {
    color: theme.palette.text.primary,
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: theme.palette.text.primary,
  },
  '& .MuiInput-underline:before': {
    borderBottomColor: theme.palette.text.secondary,
  },
  '& .MuiInput-underline:hover:before': {
    borderBottomColor: theme.palette.text.secondary,
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: theme.palette.text.secondary,
  },
}));

const HomePage = () => {
  const [filteredData, setFilteredData] = useState(defaultStoreCardData);
  const { t } = useTranslation();

  const handleFilterData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const lowerValue = event?.target.value?.toLowerCase();

    setFilteredData(
      defaultStoreCardData.filter((store) => {
        const lowerTitle = store.title.toLowerCase();
        const lowerCategory = store.businessCategory.toLowerCase();

        return (
          lowerTitle.includes(lowerValue) || lowerCategory.includes(lowerValue)
        );
      })
    );
  };

  return (
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
        </GridContainer>
      </FlexedBox>
    </BoxContainer>
  );
};

export default HomePage;
