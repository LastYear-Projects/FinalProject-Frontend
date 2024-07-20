import { Grid } from '@mui/material';
import CreditCard from '../../../component/creditCard/CreditCard';
import React from 'react';
import { CreditCardType } from '../../../globalTypes';

const CreditCardListSection = ({ creditCards }) => {
  console.log(creditCards);

  return (
    <Grid marginTop={2} container rowGap={2} columnGap={2}>
      {React.Children.toArray(
        creditCards?.map((card: CreditCardType) => (
          <Grid item xs={12} display='flex' justifyContent='center'>
            <CreditCard {...card} cardId={card._id} />
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default CreditCardListSection;
