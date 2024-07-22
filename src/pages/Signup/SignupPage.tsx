import { useForm, Controller } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material/';
import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material';
import { handleLogin, handleRegister, toastify } from '../../utils/utils';
import { useIsAuth } from '../../store/store';
import { useEffect } from 'react';

// Define Zod schema
const schema = z.object({
  firstName: z
    .string()
    .min(2, 'Valid name is required')
    .regex(/^[A-Za-z\u0590-\u05FF]+$/, 'First name can only contain letters'),
  lastName: z
    .string()
    .min(2, 'Valid name is required')
    .regex(/^[A-Za-z\u0590-\u05FF]+$/, 'Last name can only contain letters'),
  email: z.string().email('Invalid email was inserted'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  userPreferences: z.object({
    profitType: z.enum(['points', 'lowestPrice', 'nominalValue']).optional(),
  }),
});

export type SignUpType = z.infer<typeof schema>;

const SignUpPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const theme = useTheme();
  const { control, handleSubmit, reset } = useForm<SignUpType>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      userPreferences: {
        profitType: 'nominalValue',
      },
    },
  });
  const setIsAuthenticate = useIsAuth((state) => state.setIsAutenticate);

  const onSubmit = async (data: SignUpType) => {
    const statusResponse = await handleRegister(data);
    console.log(data);

    if (statusResponse === 201) {
      toastify({
        type: 'success',
        message: 'User created successfully',
        position: 'top-right',
      });
      await handleLogin(data.email, data.password);
      setIsAuthenticate(true);
      navigate('/');
    }
    reset();
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticate(true);
      navigate('/');
    }
  }, [setIsAuthenticate]);

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
          {t('SignUp')}
        </Typography>
        <Box
          component='form'
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller
                name='firstName'
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    autoComplete='given-name'
                    required
                    fullWidth
                    id='firstName'
                    label={t('First Name')}
                    autoFocus
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='lastName'
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    required
                    fullWidth
                    id='lastName'
                    label={t('Last Name')}
                    autoComplete='family-name'
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name='email'
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    required
                    fullWidth
                    id='email'
                    label={t('Email')}
                    autoComplete='email'
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name='password'
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    required
                    fullWidth
                    name='password'
                    label={t('Password')}
                    type='password'
                    id='password'
                    autoComplete='new-password'
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel id='profitType-label'>
                  {t('Profit Type')}
                </InputLabel>
                <Controller
                  name='userPreferences.profitType'
                  control={control}
                  render={({ field, fieldState }) => (
                    <>
                      <Select
                        {...field}
                        labelId='profitType-label'
                        id='profitType'
                        label={t('Profit Type')}
                        error={!!fieldState.error}
                      >
                        <MenuItem value='points'>{t('Points')}</MenuItem>
                        <MenuItem value='lowestPrice'>
                          {t('Lowest Price')}
                        </MenuItem>
                        <MenuItem value='nominalValue'>
                          {t('Nominal Value')}
                        </MenuItem>
                      </Select>
                      <Typography variant='caption' color='error'>
                        {fieldState.error?.message}
                      </Typography>
                    </>
                  )}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{
              mt: 3,
              mb: 2,
            }}
          >
            {t('SignUp')}
          </Button>
          <Grid container justifyContent='flex-start'>
            <Grid item>
              <NavLink
                style={{ color: theme.palette.secondary.main }}
                to='/signin'
              >
                {t('Already have an account? Sign In')}
              </NavLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUpPage;
