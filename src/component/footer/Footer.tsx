import { Box, Typography, styled, useTheme } from "@mui/material";

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  textAlign: "center",
  padding: "0.7rem",
}));

const Footer = () => {
  const theme = useTheme();
  return (
    <StyledBox>
      <Typography
        sx={{ fontWeight: theme.typography.fontWeightBold }}
        variant="caption"
      >
        {"© 2024 SwipeAdvisor"}
      </Typography>
    </StyledBox>
  );
};

export default Footer;
