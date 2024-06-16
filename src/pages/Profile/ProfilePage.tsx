import React, { useState } from "react";
import {
  Cancel as CancelIcon,
  Edit as EditIcon,
  Save as SaveIcon,
} from "@mui/icons-material";
import {
  Box,
  IconButton,
  TextField,
  Typography,
  styled,
  useTheme,
  Grid,
} from "@mui/material";
import { COLORS } from "../../theme";
import CreditCard from "../../component/creditCard/CreditCard";

type CreditCardType = {
  cardName: string;
  background: string;
  textColor: string;
};

type UserData = {
  FullName: string;
  Phone: string;
  Email: string;
  CreditCards?: CreditCardType[];
};

const userData: UserData = {
  FullName: "Idan Asayag",
  Phone: "0525394768",
  Email: "idanasayag0@gmail.com",
  CreditCards: [
    {
      cardName: "Master Card",
      background: "#1976d2",
      textColor: "#fff",
    },
    {
      cardName: "Visa",
      background: "#ef6c00",
      textColor: "#fff",
    },
    {
      cardName: "American Express",
      background: "#ff5252",
      textColor: "#fff",
    },
    {
      cardName: "חבר",
      background: "#4caf50",
      textColor: "#fff",
    },
  ],
};

const BoxContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  marginTop: "1rem",
});

const BoxContent = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0.5rem 0",
  borderBottom: "1px solid #e0e0e0",
});

// TODO -> get the id from the url and fetch the data and display it.
const ProfilePage = () => {
  const theme = useTheme();
  const [data, setData] = useState(userData);
  const [newData, setNewData] = useState(userData);
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveNewData = () => {
    setData(newData);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setNewData(data);
    setIsEditing(false);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <BoxContainer>
      <Typography
        variant="h4"
        sx={{
          margin: "1rem 0 2rem 0",
          fontWeight: theme.typography.fontWeightBold,
        }}
      >
        {"Profile Page"}
      </Typography>
      <Box>
        {Object.entries(data).map(
          ([key, value]) =>
            key !== "CreditCards" && (
              <BoxContent key={key}>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: theme.typography.fontWeightBold,
                    minWidth: "100px",
                  }}
                >
                  {key}:
                </Typography>
                {isEditing ? (
                  <TextField
                    name={key}
                    onChange={onChange}
                    value={newData[key as keyof UserData]}
                  />
                ) : (
                  <Typography
                    variant="body1"
                    sx={{
                      flexGrow: 1,
                    }}
                  >
                    {typeof value === "string" ? value : ""}
                  </Typography>
                )}
                {isEditing ? (
                  <Box>
                    <IconButton edge="end" onClick={handleCancelEdit}>
                      <CancelIcon sx={{ color: COLORS.ERROR }} />
                    </IconButton>
                    <IconButton edge="end" onClick={handleSaveNewData}>
                      <SaveIcon sx={{ color: COLORS.SUCCESS }} />
                    </IconButton>
                  </Box>
                ) : (
                  <IconButton edge="end" onClick={() => setIsEditing(true)}>
                    <EditIcon />
                  </IconButton>
                )}
              </BoxContent>
            )
        )}
      </Box>
      <Box>
        <Typography
          variant="h6"
          sx={{
            fontWeight: theme.typography.fontWeightBold,
            margin: "1.5rem",
            textAlign: "center",
          }}
        >
          {"Credit Cards"}
        </Typography>
        <Grid container spacing={2}>
          {data.CreditCards?.map((card, index) => (
            <Grid
              item
              xs={12}
              md={4}
              key={card.cardName + index}
              display="flex"
              justifyContent="center"
            >
              <CreditCard {...card} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </BoxContainer>
  );
};

export default ProfilePage;
