import { Add as AddIcon, Cancel as CancelIcon } from '@mui/icons-material';
import { Box, IconButton, Typography, styled } from '@mui/material';
import { isHebrew } from '../../utils/utils';
import { CardKeys, Cards } from '../../globalTypes';

const BoxContainer = styled(Box, {
  shouldForwardProp: (props) => props !== 'background' && props !== 'textColor',
})<{ background: string; textColor: string }>(({ background, textColor }) => ({
  width: '18rem',
  height: '11.25rem',
  backgroundColor: background,
  borderRadius: '0.625rem',
  padding: '1rem 1.5rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  color: textColor,
  fontFamily: 'Arial, sans-serif',
  position: 'relative',
}));

const FlexBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export type CreditCardProps = {
  cardName: string;
  cardId: string;
  cardBrand: CardKeys;
  background?: string;
  textColor?: string;
  cancelButton?: boolean;
  addButton?: boolean;
};

const CreditCard = ({
  cardName,
  cardId,
  cardBrand,
  background = 'gray',
  textColor = 'white',
  cancelButton = false,
  addButton = false,
}: CreditCardProps) => {
  const handleRemoveCard = (cardId: string) => {
    //TODO -> remove from the db and from the user card list.
    console.log(`${cardId} Removed`);
  };

  const handleAddCard = (cardId: string) => {
    //TODO -> add the card to the db and to the user card list.
    console.log(`${cardId} Added`);
  };

  return (
    <BoxContainer background={background} textColor={textColor}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          variant='h5'
          sx={{
            fontWeight: 'bold',
            textAlign: isHebrew(cardName) ? 'right' : 'left',
            marginRight: '0.25rem',
          }}
        >
          {cardName}
        </Typography>
        <img src={Cards[cardBrand]} alt='creditCardLogo' width={50} />
      </Box>

      <Typography sx={{ letterSpacing: '0.225rem' }}>
        {'**** **** **** 0123'}
      </Typography>
      <FlexBox>
        <Typography variant='body1'>
          {'User Name from token | Nothing'}
        </Typography>
      </FlexBox>
      <Box
        sx={{
          position: 'absolute',
          right: -5,
          top: -5,
        }}
      >
        {cancelButton && (
          <IconButton onClick={() => handleRemoveCard(cardId)}>
            <CancelIcon
              sx={{
                color: background === 'white' ? 'black' : 'white',
                '&:hover': {
                  color: 'red',
                },
              }}
            />
          </IconButton>
        )}
        {addButton && (
          <IconButton onClick={() => handleAddCard(cardId)}>
            <AddIcon
              sx={{ color: background === 'white' ? 'black' : 'white' }}
            />
          </IconButton>
        )}
      </Box>
    </BoxContainer>
  );
};

export default CreditCard;
