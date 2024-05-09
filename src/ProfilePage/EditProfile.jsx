import React, { useState } from 'react';
import axios from 'axios';
import getUserDataFromToken from '../tokenUtils';
import { useNavigate } from 'react-router-dom'; // 


const EditProfile = () => {
  const userData = getUserDataFromToken(); // Assuming this function retrieves user data including name and userId
  const [userName, setUserName] = useState(userData.username); // Initialize userName state with userData.name
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const authToken = JSON.parse(localStorage.getItem('token')); // Get the auth token from localStorage

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.put(
        `https://localhost:7271/api/user/updateUser/${userData.userId}`, // Update the URL with the correct endpoint
        { userName, userEmail }, // Data to be updated
        { headers: { Authorization: `Bearer ${authToken}` } } // Pass the authorization token in the headers
      );
      
      console.log('User profile updated:', response.data);
      navigate('/profile')
      // Handle success or navigate to another page if needed
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred while updating user profile');
      console.error('Error updating user profile:', error);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="userName" className="block text-sm font-medium text-gray-700">User Name:</label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700">Email:</label>
          <input
            type="email"
            id="userEmail"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button type="submit" disabled={loading} className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
