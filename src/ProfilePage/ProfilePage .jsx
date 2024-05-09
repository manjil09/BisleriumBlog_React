import React, { useState, useEffect } from 'react';
import axios from 'axios';
import getUserDataFromToken from '../tokenUtils';

const  userData = getUserDataFromToken();

const UserProfile = () => {
  // State to store user profile data
  const [profile, setProfile] = useState(null);
  // State to store loading status
  const [loading, setLoading] = useState(true);
  // State to store error status
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch user profile data
    const fetchUserProfile = async () => {
      try {
        // Make API request to fetch user profile data
        const response = await axios.get(`https://localhost:7271/api/user/getProfile/${userData.userId}`);

        // Extract profile data from the response
        const userProfile = response.data.result;
        // Set the profile state with the fetched data
        setProfile(userProfile);
        // Set loading state to false
        setLoading(false);
      } catch (error) {
        // Set error state if request fails
        setError(error.message);
        // Set loading state to false
        setLoading(false);
      }
    };

    // Call the fetchUserProfile function
    fetchUserProfile();
  }, []);

  // If loading, display loading message
  if (loading) {
    return <p>Loading...</p>;
  }

  // If there's an error, display error message
  if (error) {
    return <p>Error: {error}</p>;
  }

  // If profile data is available, display user profile
  return (
    <div className="flex items-center border border-gray-200 p-4 rounded-lg">
      {/* Profile Image */}
      <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden mr-6">
        <img
          src={profile.profileImage}
          className="w-full h-full object-cover"
        />
      </div>
      {/* Profile Information */}
      <div>
        <h1 className="text-2xl font-bold mb-2">{userData.name}</h1>
        <p className="text-gray-600 mb-1">{profile.userEmail}</p>
        <p className="text-gray-600 mb-1">{userData.role}</p>
      </div>
    </div>
  );
};

export default UserProfile;
