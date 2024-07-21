import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import CreditCard from '../../../component/creditCard/CreditCard';
import { CreditCardType } from '../../../globalTypes';
import { convertToNumber } from '../../../utils/utils';

const CreditCardListSection = ({ creditCards }) => {
  return (
    <Grid marginTop={2} container rowGap={2} columnGap={2}>
      {React.Children.toArray(
        creditCards?.map((card: CreditCardType) => (
          <Grid item xs={12} display='flex' justifyContent='center'>
            <Box>
              <Typography variant='body1' align='center'>
                {card.grade
                  ? `Grade: ${convertToNumber(card.grade)}₪`
                  : '0.00₪'}
              </Typography>
              <Typography variant='body1' align='center'>
                {card.profit
                  ? `Profit: ${convertToNumber(card.profit)}₪`
                  : '0.00₪'}
              </Typography>
              <CreditCard {...card} cardId={card._id} />
            </Box>
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default CreditCardListSection;
