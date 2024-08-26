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
              {/*<Typography variant='body1' align='center'>*/}
              {/*  {card.grade*/}
              {/*    ? `Grade: ${convertToNumber(card.grade) ?? '0.00₪'}₪`*/}
              {/*    : 'Grade: 0.00₪'}*/}
              {/*</Typography>*/}
              <Typography variant='body1' align='center'>
                {card.profit && Number(card.profit) !== 0
                  ? `You Save: ${convertToNumber(card.profit)}₪`
                  : 'No benefits found for this card'}
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
//
// carfour id :
// 6658b91a8aa36ed0b6cef985
// need it id:
//     6658b688892bce96bd5d588f
//
// hever id :
//     66bb7766995330bf77f4ccb2

// bit id:
//     6658b67e892bce96bd5d588d
