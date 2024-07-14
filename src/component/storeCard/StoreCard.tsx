import * as React from "react";

import {
  Box,
  Button,
  CardActionArea,
  styled,
  useTheme,
  Typography,
  CardMedia,
  CardContent,
  Card,
} from "@mui/material";
import { isHebrew } from "../../utils/utils";
import { useNavigate } from "react-router";

const StyledCardContainer = styled(Card)(() => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: 345,
}));

const StyledCardContent = styled(CardContent)(() => ({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
}));

export type StoreCardProps = {
  backgroundImage: string;
  title: string;
  description: string;
  id: number;
};

const StoreCard = ({
  backgroundImage,
  title,
  description,
  id,
}: StoreCardProps) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const checkHebrewCss = {
    textAlign: isHebrew(title) ? "right" : "left",
    direction: isHebrew(description) ? "rtl" : "ltr",
  };

  const handleClick = () => {
    console.log(`StoreCard ${id} Clicked`);
    navigate(`/transaction/${id}`);
  };
  return (
    <StyledCardContainer onClick={handleClick}>
      <CardActionArea
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <CardMedia
          component="img"
          height="140"
          image={backgroundImage}
          alt={`${title} background image`}
        />
        <StyledCardContent>
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              sx={{ ...checkHebrewCss }}
              gutterBottom
              variant="h5"
              component="div"
            >
              {title}
            </Typography>
            <Typography
              sx={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                ...checkHebrewCss,
              }}
              variant="body2"
              color="text.secondary"
            >
              {description}
            </Typography>
          </Box>
        </StyledCardContent>
        <Button fullWidth>
          <Typography sx={{ fontWeight: theme.typography.fontWeightBold }}>
            {"מעבר לחנות"}
          </Typography>
        </Button>
      </CardActionArea>
    </StyledCardContainer>
  );
};

export default StoreCard;
