import { Box, Typography, styled } from "@mui/material";

type CreditCardProps = {
  cardName: string;
  background: string;
  textColor: string;
};

const BoxContainer = styled(Box)<{ background: string; textColor: string }>(
  ({ theme, background, textColor }) => ({
    width: "18rem",
    height: "11.25rem",
    backgroundColor: background,
    borderRadius: "0.625rem",
    padding: "1rem 1.5rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    color: textColor,
    fontFamily: "Arial, sans-serif",
  })
);

const FlexBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const isHebrew = (text: string) => {
  return /[\u0590-\u05FF]/.test(text);
};

const CreditCard = ({ cardName, background, textColor }: CreditCardProps) => {
  return (
    <BoxContainer background={background} textColor={textColor}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          textAlign: isHebrew(cardName) ? "right" : "left",
        }}
      >
        {cardName}
      </Typography>
      <Typography sx={{ letterSpacing: "0.225rem" }}>
        {"**** **** **** 0123"}
      </Typography>
      <FlexBox>
        <Typography variant="body1">{"User Name from token"}</Typography>
        <Typography variant="body1">{"0/29"}</Typography>
      </FlexBox>
    </BoxContainer>
  );
};

export default CreditCard;
