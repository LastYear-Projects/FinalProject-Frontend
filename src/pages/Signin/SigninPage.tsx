import { useForm, Controller } from 'react-hook-form';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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
import { handleLogin } from '../../utils/utils';
import { useIsAuth } from '../../store/store';

// Define Zod schema
const schema = z.object({
  email: z.string().email('Invalid email was inserted'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export type SignInType = z.infer<typeof schema>;

const SignIn = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const theme = useTheme();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignInType>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const setIsAuthenticate = useIsAuth((state) => state.setIsAutenticate);
  const isAuthenticate = useIsAuth((state) => state.isAuthenticate);

  const onSubmit = async (data: SignInType) => {
    await handleLogin(data.email, data.password);
    setIsAuthenticate(true);
    navigate('/');
    reset();
  };

  if (isAuthenticate) {
    return <Navigate to='/' />;
  }

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
        <Avatar sx={{ m: 1, bgcolor: theme.palette.secondary.contrastText }}>
          <LockOutlinedIcon sx={{ color: 'white' }} />
        </Avatar>
        <Typography component='h1' variant='h5'>
          {t('SignIn')}
        </Typography>
        <Box
          component='form'
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <Controller
            name='email'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                margin='normal'
                required
                fullWidth
                id='email'
                label={t('Email')}
                autoComplete='email'
                autoFocus
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
          <Controller
            name='password'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                margin='normal'
                required
                fullWidth
                name='password'
                label={t('Password')}
                type='password'
                id='password'
                autoComplete='current-password'
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}
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
};

export default SignIn;
