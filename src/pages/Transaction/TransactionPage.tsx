import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";

const TransactionPage = () => {
  const [transactionPrice, setTransactionPrice] = React.useState(0);
  const { storeId } = useParams();
  const { t } = useTranslation();

  const onSubmit = () => {
    console.log(storeId, transactionPrice);
  };
  return (
    <Box
      sx={{
        marginTop: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Typography sx={{ marginTop: 4 }} variant="h4">
        {t("Enter Transaction Price")}
      </Typography>
      <TextField
        sx={{ marginTop: 4 }}
        id="outlined-basic"
        label={t("Enter Transaction Price")}
        variant="outlined"
        type="number"
        value={transactionPrice}
        onChange={(e) => {
          const value = Number(e.target.value);
          if (value >= 0) {
            setTransactionPrice(value);
          }
        }}
      />
      <Button onClick={onSubmit} sx={{ marginTop: 4 }} variant="outlined">
        {t("Go For It")}
      </Button>
    </Box>
  );
};

export default TransactionPage;