import React, { useState } from 'react';
import axiosRequest from '../../utils/restApi';
import { Navigate, useNavigate } from 'react-router';
import { useIsAuth } from '../../store/store';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  useTheme,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toastify } from '../../utils/utils';

const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const { isAuthenticate } = useIsAuth();
  const theme = useTheme();
  const { t } = useTranslation();

  if (isAuthenticate) {
    return <Navigate to='/' />;
  }

  const handleSendOtp = async () => {
    if (!email) {
      toastify({
        type: 'error',
        message: 'Please enter your email',
        position: 'top-right',
      });
      return;
    }
    try {
      await axiosRequest({
        data: { email },
        method: 'POST',
        url: '/auth/send-otp',
      }).then(() => {
        toastify({
          type: 'success',
          message: 'Email sent successfully',
          position: 'top-right',
        });
        setIsEmailSent(true);
      });
    } catch (error) {
      console.error('Error sending OTP', error);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      axiosRequest({
        data: { email, otp },
        method: 'POST',
        url: '/auth/verify-otp',
      }).then((res) => {
        if (res.status === 400) {
          toastify({
            type: 'error',
            message: 'Invalid OTP',
            position: 'top-right',
          });
          return;
        }
        toastify({
          type: 'success',
          message: 'OTP verified successfully',
          position: 'top-right',
        });
        setIsOtpVerified(true);
      });
    } catch (error) {
      console.error('Error verifying OTP', error);
    }
  };

  const handleChangePassword = async () => {
    try {
      await axiosRequest({
        data: { email, newPassword },
        method: 'POST',
        url: '/auth/reset-password',
      }).then(() => navigate('/signin'));
    } catch (error) {
      console.error('Error resetting password', error);
    }
  };

  return (
    <Container maxWidth='sm'>
      <Box mt={5}>
        <Typography variant='h4' gutterBottom>
          {t('Reset Password')}
        </Typography>
        {!isEmailSent && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type='email'
                label={t('Email')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant='outlined'
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant='contained'
                color='primary'
                onClick={handleSendOtp}
              >
                {t('Send OTP')}
              </Button>
            </Grid>
          </Grid>
        )}

        {isEmailSent && !isOtpVerified && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type='text'
                label={t('OTP')}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                variant='outlined'
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant='contained'
                color='primary'
                onClick={handleVerifyOtp}
              >
                {t('Verify OTP')}
              </Button>
            </Grid>
          </Grid>
        )}

        {isOtpVerified && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type='password'
                label={t('Password')}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                variant='outlined'
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant='contained'
                color='primary'
                onClick={handleChangePassword}
              >
                {t('Change Password')}
              </Button>
            </Grid>
          </Grid>
        )}
        <Box marginTop={'0.5rem'}>
          <NavLink style={{ color: theme.palette.secondary.main }} to='/signin'>
            {t('Already have an account? Sign In')}
          </NavLink>
        </Box>
      </Box>
    </Container>
  );
};

export default ResetPassword;
