import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Grid, styled, TextField } from '@mui/material';
import StoreCard from '../../component/storeCard/StoreCard';

const defaultStoreCardData = [
  {
    businessImage: 'https://picsum.photos/200',
    title: 'עברית',
    businessCategory: 'ביגוד',
    id: 1,
  },
  {
    businessImage: 'https://picsum.photos/200',
    title: 'Title',
    businessCategory: 'Food',
    id: 2,
  },
  {
    businessImage: 'https://picsum.photos/200',
    title: 'Title',
    businessCategory: 'Category',
    id: 3,
  },
  {
    businessImage: 'https://picsum.photos/200',
    title: 'Title',
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

const HomePage = () => {
  const [filteredData, setFilteredData] = useState(defaultStoreCardData);
  const { t } = useTranslation();

  const handleFilterData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilteredData(
      defaultStoreCardData.filter((store) =>
        store.title
          .toLowerCase()
          .includes(event.target.value.toLocaleLowerCase())
      )
    );
  };

  return (
    <Box
      gap={3}
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <TextField
        sx={{ width: '10rem' }}
        id='standard-basic'
        label={t('Search Store')}
        variant='standard'
        onChange={handleFilterData}
      />
      <FlexedBox>
        <Grid
          container
          rowSpacing={6}
          columnSpacing={6}
          sx={{
            maxWidth: '85rem',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {filteredData.map((storeCardData, index) => (
            <Grid item key={index}>
              <StoreCard key={index} {...storeCardData} />
            </Grid>
          ))}
        </Grid>
      </FlexedBox>
    </Box>
  );
};

export default HomePage;
