import { useState } from 'react';
import axiosRequest from '../../utils/restApi';

const ResetPassword = () => {
  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosRequest({
        url: '/auth/reset-password-request',
        method: 'POST',
        data: {
          email,
        },
      });
      setStep('otp');
    } catch (error) {
      console.error('Error sending reset password request', error);
    }
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosRequest({
        url: '/auth/verify-otp',
        method: 'POST',
        data: {
          email,
          otp,
        },
      });
      setStep('newPassword');
    } catch (error) {
      console.error('Error verifying OTP', error);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      await axiosRequest({
        url: '/auth/reset-password',
        method: 'POST',
        data: {
          email,
          newPassword,
        },
      });
      alert('Password reset successfully');
    } catch (error) {
      console.error('Error resetting password', error);
    }
  };

  return (
    <div>
      {step === 'email' && (
        <form onSubmit={handleEmailSubmit}>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your email'
            required
          />
          <button type='submit'>Send OTP</button>
        </form>
      )}

      {step === 'otp' && (
        <form onSubmit={handleOTPSubmit}>
          <input
            type='text'
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
            placeholder='Enter OTP'
            required
          />
          <button type='submit'>Verify OTP</button>
        </form>
      )}

      {step === 'newPassword' && (
        <form onSubmit={handlePasswordReset}>
          <input
            type='password'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder='Enter new password'
            required
          />
          <button type='submit'>Reset Password</button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
