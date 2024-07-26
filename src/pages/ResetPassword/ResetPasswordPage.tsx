import React, { useEffect, useState } from 'react';
import axiosRequest from '../../utils/restApi';
import { useNavigate } from 'react-router';
import { useUser } from '../../store/store';

const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const currentUser = useUser((state) => state.user);

  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [navigate, currentUser]);

  const handleSendOtp = async () => {
    try {
      await axiosRequest({
        data: { email },
        method: 'POST',
        url: '/auth/send-otp',
      }).then(() => setIsEmailSent(true));
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
      }).then(() => setIsOtpVerified(true));
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
    <div>
      {!isEmailSent && (
        <div>
          <h2>Reset Password</h2>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your email'
          />
          <button onClick={handleSendOtp}>Send OTP</button>
        </div>
      )}

      {isEmailSent && !isOtpVerified && (
        <div>
          <h2>Verify OTP</h2>
          <input
            type='text'
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder='Enter OTP'
          />
          <button onClick={handleVerifyOtp}>Verify OTP</button>
        </div>
      )}

      {isOtpVerified && (
        <div>
          <h2>Change Password</h2>
          <input
            type='password'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder='Enter new password'
          />
          <button onClick={handleChangePassword}>Change Password</button>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
