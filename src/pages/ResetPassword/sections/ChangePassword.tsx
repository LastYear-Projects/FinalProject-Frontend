import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axiosRequest from '../../../utils/restApi';

const ChangePassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState('');
  const location = useLocation();
  const email = new URLSearchParams(location.search).get('email') || '';

  const handleChangePassword = async () => {
    try {
      await axiosRequest({
        data: { email, newPassword },
        method: 'POST',
        url: '/auth/reset-password',
      });
    } catch (error) {
      console.error('Error resetting password', error);
    }
  };

  return (
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
  );
};

export default ChangePassword;
