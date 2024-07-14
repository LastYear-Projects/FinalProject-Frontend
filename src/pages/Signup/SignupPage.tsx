import { useState } from "react";

import { NavLink } from "react-router-dom";

import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  useTheme,
} from "@mui/material/";

import { LockOutlined as LockOutlinedIcon } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

export type SignUpType = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
};

const SignUpPage = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [formData, setFormData] = useState<SignUpType>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
    });
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: theme.palette.background.default }}>
          <LockOutlinedIcon sx={{ color: "white" }} />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t("SignUp")}
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label={t("First Name")}
                autoFocus
                onChange={onChange}
                value={formData.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label={t("Last Name")}
                name="lastName"
                autoComplete="family-name"
                onChange={onChange}
                value={formData.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="phone"
                label={t("Phone")}
                name="phone"
                autoComplete="phone"
                onChange={onChange}
                value={formData.phone}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label={t("Email Address")}
                name="email"
                autoComplete="email"
                onChange={onChange}
                value={formData.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label={t("Password")}
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={onChange}
                value={formData.password}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
            }}
          >
            {t("SignUp")}
          </Button>
          <Grid container justifyContent="flex-start">
            <Grid item>
              <NavLink
                style={{ color: theme.palette.secondary.main }}
                to="/signin"
              >
                {t("Already have an account? Sign In")}
              </NavLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUpPage;
