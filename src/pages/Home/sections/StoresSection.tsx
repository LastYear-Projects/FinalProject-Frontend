import React from 'react';
import { Box, Grid, styled } from '@mui/material';
import StoreCard, {
  StoreCardProps,
} from '../../../component/storeCard/StoreCard';

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

const StoresSection = ({
  filteredData,
}: {
  filteredData: StoreCardProps[];
}) => {
  return (
    <Box>
      <FlexedBox>
        <GridContainer container rowSpacing={6} columnSpacing={6}>
          {filteredData?.map((storeCardData, index) => (
            <Grid item key={index}>
              <StoreCard key={index} {...storeCardData} />
            </Grid>
          ))}
        </GridContainer>
      </FlexedBox>
    </Box>
  );
};

export default StoresSection;
