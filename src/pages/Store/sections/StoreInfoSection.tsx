import { Box, Button, TextField } from '@mui/material';

const StoreInfoSection = ({
  store,
  price,
  handlePriceChange,
  getAlgorithmResult,
  onKeyPress,
  t,
}) => (
  <>
    <img src={store?.businessImage} alt={store?.businessName} width={200} />
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        marginTop: 2,
        gap: 2,
      }}
    >
      <TextField
        onKeyDown={onKeyPress}
        id='price'
        label={t('Transaction Price')}
        type='number'
        value={price}
        onChange={handlePriceChange}
      />
      <Button variant='contained' color='primary' onClick={getAlgorithmResult}>
        {t('Update price')}
      </Button>
    </Box>
  </>
);

export default StoreInfoSection;
