import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import CreditCard from '../../../component/creditCard/CreditCard';
import { CreditCardType } from '../../../globalTypes';
import { useTranslation } from 'react-i18next';

type AddNewCardsSectionProps = {
  filteredCreditCards: CreditCardType[];
};

const AddNewCardsSection: React.FC<AddNewCardsSectionProps> = ({
  filteredCreditCards,
}) => {
  const { t } = useTranslation();
  return (
    <Box>
      <Typography
        variant='h6'
        sx={{
          fontWeight: 'bold',
          margin: '1.5rem',
          borderBottom: '1px solid #e0e0e0',
          width: '100%',
          textAlign: 'center',
        }}
      >
        {t('Add New Cards')}
      </Typography>
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Grid container spacing={2}>
          {React.Children.toArray(
            filteredCreditCards.map((card) => (
              <Grid
                item
                xs={12}
                sm={'auto'}
                md={'auto'}
                display='flex'
                justifyContent='center'
              >
                <CreditCard {...card} cardId={card._id} addButton />
              </Grid>
            ))
          )}
          {filteredCreditCards.length === 0 && (
            <Typography variant='h6' sx={{ margin: '1rem' }}>
              {t('No more cards to add')}...
            </Typography>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default AddNewCardsSection;
