import React from 'react';
import { Box, Typography, Grid, IconButton } from '@mui/material';
import { Cancel as CancelIcon, Edit as EditIcon } from '@mui/icons-material';
import CreditCard from '../../../component/creditCard/CreditCard';
import { UserType } from '../../../globalTypes';
import { useTranslation } from 'react-i18next';

type CreditCardSectionProps = {
  creditCards?: UserType['creditCards'];
  isCreditCardEditing: boolean;
  setIsCreditCardEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreditCardSection: React.FC<CreditCardSectionProps> = ({
  creditCards,
  isCreditCardEditing,
  setIsCreditCardEditing,
}) => {
  const { t } = useTranslation();

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '1.5rem',
          borderBottom: '1px solid #e0e0e0',
        }}
      >
        <Typography
          variant='h6'
          sx={{
            fontWeight: 'bold',
          }}
        >
          {t('CreditCards')}
        </Typography>
        <IconButton onClick={() => setIsCreditCardEditing((prev) => !prev)}>
          {isCreditCardEditing ? <CancelIcon /> : <EditIcon />}
        </IconButton>
      </Box>
      <Grid container spacing={2}>
        {creditCards?.map((card, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={'auto'}
            key={card.cardName + index}
            display='flex'
            justifyContent='center'
            sx={{
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            }}
          >
            <CreditCard
              {...card}
              cardId={card._id}
              cancelButton={isCreditCardEditing}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CreditCardSection;
