import React, { useState } from 'react';
import axios from 'axios';
import Navigation from '../NavBar/Navigation';
import getUserDataFromToken from '../tokenUtils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const CreateBlog = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState(null); // Change to null
  const [errorMessage, setErrorMessage] = useState('');
  const authToken = JSON.parse(localStorage.getItem('token'));


  // Now you can use getUserDataFromToken wherever needed
  const userData = getUserDataFromToken();
  console.log("messageToken", authToken)

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
  const notify = () => toast(errorMessage);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setErrorMessage('Image is required');
      notify();
      // setimageMessage('User register successful')
      // notify();
      //ramm
      return; // Stop the function execution if image is not provided
    }

    try {
      if (userData) {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('body', body);
        formData.append('image', image); // Append image to formData
        formData.append('userId', userData.userId);

        const response = await axios.post(
          'https://localhost:7271/api/blog/add',
          formData,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              'Content-Type': 'multipart/form-data' // Set content type to multipart/form-data for file upload
            }
          }
        );

        console.log('Blog post created successfully:', response.data);
        setErrorMessage('Blog post created successfully:');
        notify();
        window.location.href = '/myBlog';
      } else {
        setErrorMessage('You are not logged in! Please login before creating blog.');
        notify();
      }
      // Optionally, you can redirect the user to another page or perform any other action upon successful creation of the blog post.
    } catch (error) {
      if (error.response) {
        console.error('Server responded with error status:', error.response.status);
        console.error('Error details:', error.response.data);
        // setErrorMessage(error.response.data.message);
        setErrorMessage('Blog post failed. Please check if valid data is entered in each field.');
        notify();

      } else if (error.request) {
        console.error('No response received from server:', error.request);
        setErrorMessage(error.response.data.message);
        notify();
      } else {
        console.error('Error setting up the request:', error.message);
        setErrorMessage(error.response.data.message);
        notify();
      }
      // Handle error
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-xl">
      <button onClick={onClose} className="text-gray-600 hover:text-red-600">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
      <h2 className="text-2xl mb-4">Create a New Blog Post</h2>
      <div>
        <ToastContainer />
      </div>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Body:</label>
          <textarea value={body} onChange={(e) => setBody(e.target.value)} required className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Image:</label>
          <input type="file" onChange={(e) => handleImageUpload(e)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <button type="submit" onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Create Post</button>
      </form>
    </div>
  );
};

export default CreateBlog;
