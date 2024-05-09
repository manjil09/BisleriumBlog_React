import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import getUserDataFromToken from '../tokenUtils';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const userData = getUserDataFromToken();
  const authToken = JSON.parse(localStorage.getItem('token'));

  const handleChangePassword = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post('https://localhost:7271/api/user/changePassword', {
        userId: userData.userId,
        currentPassword: oldPassword,
        newPassword
      }, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      toast.success(response.data.message); // Show success toast
      setLoading(false);
      setOldPassword('');
      setNewPassword('');
      setError(null); // Reset error state on successful request
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred while changing password');
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Change Password</h2>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <form onSubmit={handleChangePassword} className="w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="oldPassword" className="block text-gray-700">Old Password</label>
          <input type="password" id="oldPassword" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required placeholder="Enter your old password" className="form-input mt-1 block w-full border border-gray-500 rounded-md focus:outline-none focus:border-blue-500 pl-4 pr-2" />
        </div>
        <div className="mb-6">
          <label htmlFor="newPassword" className="block text-gray-700">New Password</label>
          <input type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required placeholder="Enter your new password" className="form-input mt-1 block w-full border border-gray-500 rounded-md focus:outline-none focus:border-blue-500 pl-4 pr-2" />
        </div>
        <button type="submit" disabled={loading} className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          {loading ? 'Changing Password...' : 'Change Password'}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
