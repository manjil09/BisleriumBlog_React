import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import getUserDataFromToken from '../tokenUtils';
import Navigation from '../NavBar/Navigation';
import Footer from '../NavBar/Footer';

const userData = getUserDataFromToken();

const UserProfile = () => {
  const navigate = useNavigate(); 

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`https://localhost:7271/api/user/getProfile/${userData.userId}`);
        const userProfile = response.data.result;
        setProfile(userProfile);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleEditProfile = () => {
    // Navigate to the edit profile page
    navigate('/editProfile');
  };

  const handleChangePassword = () => {
    navigate('/changePassword');
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <Navigation />
      <div className="flex items-center border border-gray-200 p-4 rounded-lg">
      <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden mr-6 flex items-center justify-center">
      <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
     </div>

        <div>
          <h1 className="text-2xl font-bold mb-2">{userData.name}</h1>
          <p className="text-gray-600 mb-1">{profile.userEmail}</p>
          <p className="text-gray-600 mb-1">{userData.role}</p>
          {/* Edit Profile Button */}
          <button
            onClick={handleEditProfile}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Edit Profile
          </button>
          {/* Change Password Button */}
          <button
            onClick={handleChangePassword}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Change Password
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserProfile;
