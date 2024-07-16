import { useState } from 'react';

import { NavLink } from 'react-router-dom';

import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  useTheme,
} from '@mui/material';

import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

export type SignInType = {
  email: string;
  password: string;
};

export default function SignIn() {
  const { t } = useTranslation();
  const theme = useTheme();
  const [formData, setFormData] = useState<SignInType>({
    email: '',
    password: '',
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
    setFormData({
      email: '',
      password: '',
    });
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: theme.palette.background.default }}>
          <LockOutlinedIcon sx={{ color: 'white' }} />
        </Avatar>
        <Typography component='h1' variant='h5'>
          {t('SignIn')}
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label={t('Email')}
            name='email'
            autoComplete='email'
            autoFocus
            value={formData.email}
            onChange={onChange}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label={t('Password')}
            type='password'
            id='password'
            autoComplete='current-password'
            value={formData.password}
            onChange={onChange}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{
              mt: 3,
              mb: 2,
            }}
          >
            {t('SignIn')}
          </Button>
          <Grid container>
            <Grid item xs>
              <NavLink style={{ color: theme.palette.secondary.main }} to='/'>
                {t('Forgot password?')}
              </NavLink>
            </Grid>
            <Grid item>
              <NavLink
                style={{ color: theme.palette.secondary.main }}
                to='/signup'
              >
                {t("Don't have an account? Sign Up")}
              </NavLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
