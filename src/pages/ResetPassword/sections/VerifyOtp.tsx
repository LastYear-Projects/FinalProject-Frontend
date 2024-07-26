import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axiosRequest from '../../../utils/restApi';

const VerifyOtp: React.FC = () => {
  const [otp, setOtp] = useState('');
  const location = useLocation();
  const email = new URLSearchParams(location.search).get('email') || '';

  const handleVerifyOtp = async () => {
    try {
      await axiosRequest({
        data: { email, otp },
        method: 'POST',
        url: '/auth/verify-otp',
      });
    } catch (error) {
      console.error('Error verifying OTP', error);
    }
  };

  return (
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
  );
};

export default VerifyOtp;
