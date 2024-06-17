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
import CreditCard, {
  CreditCardProps,
} from "../../component/creditCard/CreditCard";

type UserData = {
  FullName: string;
  Phone: string;
  Email: string;
  CreditCards?: CreditCardProps[];
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
      cardId: 1,
    },
    {
      cardName: "Visa",
      background: "#ef6c00",
      textColor: "#fff",
      cardId: 2,
    },
    {
      cardName: "American Express",
      background: "#ff5252",
      textColor: "#fff",
      cardId: 3,
    },
    {
      cardName: "חבר",
      background: "#4caf50",
      textColor: "#fff",
      cardId: 4,
    },
  ],
};

// TODO -> Fetch all cards without my oun cards.
const allCards = [
  {
    cardName: "New Card",
    background: "#9436d2",
    textColor: "#fff",
    cardId: 5,
  },
  {
    cardName: "New Card",
    background: "#ba3a18",
    textColor: "#fff",
    cardId: 6,
  },
  {
    cardName: "New Card",
    background: "#af5921",
    textColor: "#fff",
    cardId: 7,
  },
  {
    cardName: "כרטיס חדש",
    background: "#1bac90",
    textColor: "#fff",
    cardId: 8,
  },
];

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
  const [isCreditCardEditing, setIsCreditCardEditing] = useState(false);

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
                      maxWidth: "14rem",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "1.5rem",
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: theme.typography.fontWeightBold,
            }}
          >
            {"Credit Cards"}
          </Typography>
          {isCreditCardEditing ? (
            <IconButton onClick={() => setIsCreditCardEditing(false)}>
              <CancelIcon />
            </IconButton>
          ) : (
            <IconButton onClick={() => setIsCreditCardEditing(true)}>
              <EditIcon />
            </IconButton>
          )}
        </Box>
        <Grid container spacing={2}>
          {data.CreditCards?.map((card, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={card.cardName + index}
              display="flex"
              justifyContent="center"
            >
              <CreditCard {...card} cancelButton={isCreditCardEditing} />
            </Grid>
          ))}
        </Grid>
      </Box>
      {isCreditCardEditing && (
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: theme.typography.fontWeightBold,
              margin: "1.5rem",
              borderBottom: "1px solid #e0e0e0",
              width: "100%",
              textAlign: "center",
            }}
          >
            Add New Cards
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid container spacing={2}>
              {allCards.map((card, index) => {
                return (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    display="flex"
                    justifyContent="center"
                  >
                    <CreditCard
                      key={card.cardName + index}
                      {...card}
                      addButton={true}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Box>
      )}
    </BoxContainer>
  );
};

export default ProfilePage;
