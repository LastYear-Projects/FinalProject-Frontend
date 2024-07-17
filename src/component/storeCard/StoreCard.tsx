import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

import {
  Box,
  Button,
  CardActionArea,
  styled,
  Typography,
  CardMedia,
  CardContent,
  Card,
  Divider,
} from '@mui/material';
import { checkHebrewDirection } from '../../utils/utils';
import { STYLES } from '../../theme';

const StyledCardContainer = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  flexDirection: 'column',
  width: 345,
  borderBottomLeftRadius: 16,
  borderBottomRightRadius: 16,
  boxShadow: `${STYLES.BOX_SHADOW}`,
  border: '1px solid #cecece',
  transition: 'transform 0.3s ease-in-out',
  ':hover': {
    boxShadow: `${STYLES.BOX_SHADOW}`,
    transform: 'scale(1.05)',
  },
}));

const StyledCardContent = styled(CardContent)(() => ({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
  borderBottomLeftRadius: 16,
  borderBottomRightRadius: 16,
  textTransform: 'none',
  fontWeight: theme.typography.fontWeightBold,
}));

export type StoreCardProps = {
  businessImage: string;
  title: string;
  businessCategory: string;
  id: number;
};

const StoreCard = ({
  businessImage: businessImage,
  title,
  businessCategory: businessCategory,
  id,
}: StoreCardProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const contentDirection = checkHebrewDirection(title, businessCategory);

  const handleClick = () => {
    console.log(`StoreCard ${id} Clicked`);
    navigate(`/transaction/${id}`);
  };

  return (
    <StyledCardContainer onClick={handleClick}>
      <CardActionArea>
        <CardMedia
          sx={{
            objectFit: 'fill',
          }}
          component='img'
          height='140'
          image={businessImage}
          alt={`${title} background image`}
        />
        <Divider />
        <StyledCardContent>
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              className='card-header'
              sx={{ ...contentDirection }}
              gutterBottom
              variant='h5'
              component='div'
            >
              {title}
            </Typography>
            <Typography
              className='card-content'
              sx={{
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                ...contentDirection,
              }}
              variant='body2'
              color='text.secondary'
            >
              {businessCategory}
            </Typography>
          </Box>
        </StyledCardContent>
        <StyledButton fullWidth>{t('Choose Store')}</StyledButton>
      </CardActionArea>
    </StyledCardContainer>
  );
};

export default StoreCard;
