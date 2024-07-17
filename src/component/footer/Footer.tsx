import { Box, Typography, styled, useTheme } from '@mui/material';
import { STYLES } from '../../theme';

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  textAlign: 'center',
  padding: '0.7rem',
  marginTop: '1rem',
  boxShadow: `${STYLES.BOX_SHADOW}`,
}));

const Footer = () => {
  const theme = useTheme();
  return (
    <StyledBox>
      <Typography
        sx={{ fontWeight: theme.typography.fontWeightBold }}
        variant='caption'
      >
        {'© 2024 SwipeAdvisor'}
      </Typography>
    </StyledBox>
  );
};

export default Footer;
