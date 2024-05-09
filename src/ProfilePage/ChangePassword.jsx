import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer ,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import getUserDataFromToken from '../tokenUtils';
import { useNavigate } from 'react-router-dom'; // 


const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const userData = getUserDataFromToken();
  const [changePasswordMessage, setChangePasswordMessage] = useState(''); // State for change password message
  const authToken = JSON.parse(localStorage.getItem('token'));
  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();

    // Validate password criteria
    if (!oldPassword || !newPassword) {
      setError('Please enter both old and new passwords.');
      return;
    }

    // Reset error state
    setError(null);

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
      setChangePasswordMessage(response.data.message); // Set change password message
      notify(); // Display the success message
      setOldPassword('');
      setNewPassword('');
      // Redirect to the profile page after successful password change
      navigate('/profile');
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred while changing password');
      notify(); // Display the error message
      setLoading(false);
    }
  };

  // Function to display the notification message
  const notify = () => toast(changePasswordMessage);

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
        <button type="submit" disabled={loading} className={`bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
          {loading ? 'Changing Password...' : 'Change Password'}
        </button>
      </form>
      <ToastContainer /> {/* Container for displaying toasts */}
    </div>
  );
};

export default ChangePassword;
