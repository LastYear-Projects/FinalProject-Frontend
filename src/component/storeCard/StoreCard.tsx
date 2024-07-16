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
} from '@mui/material';
import { checkHebrewDirection } from '../../utils/utils';

const StyledCardContainer = styled(Card)(() => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: 345,
  borderBottomLeftRadius: 16,
  borderBottomRightRadius: 16,
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
  backgroundColor: theme.palette.background.default,
  color: theme.palette.primary.contrastText,
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
          component='img'
          height='140'
          image={businessImage}
          alt={`${title} background image`}
        />
        <StyledCardContent>
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              sx={{ ...contentDirection }}
              gutterBottom
              variant='h5'
              component='div'
            >
              {title}
            </Typography>
            <Typography
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
