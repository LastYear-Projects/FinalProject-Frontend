import { Grid } from '@mui/material';
import CreditCard from '../../../component/creditCard/CreditCard';

const CreditCardListSection = ({ creditCards }) => (
  <Grid marginTop={2} container rowGap={2} columnGap={2}>
    {creditCards?.map((card, index) => (
      <Grid
        item
        xs={12}
        key={card.cardName + index}
        display='flex'
        justifyContent='center'
      >
        <CreditCard {...card} />
      </Grid>
    ))}
  </Grid>
);

export default CreditCardListSection;
