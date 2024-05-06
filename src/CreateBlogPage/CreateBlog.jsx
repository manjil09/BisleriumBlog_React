import React, { useState } from 'react';
import axios from 'axios';
import Navigation from '../NavBar/Navigation';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState(null); // Change to null
  const [userId, setUserId] = useState('');
  const authToken = JSON.parse(localStorage.getItem('authToken'));

  // const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiUmFtdSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiN2FhMDQwMmQtMmRhOC00MmVhLWE2OTQtMjUzZDQ4MGVhMGM5IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiVXNlciIsImV4cCI6MTcxNDkyMDYwNiwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzI3MS8iLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo3MjcxLyJ9.dNAf0PJ7EnJmoHZGVoY0fiGAhCC-DfBZkBAtGgtRxx0'; // Replace 'your_auth_token_here' with your actual authentication token

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('body', body);
      formData.append('image', image); // Append image to formData
      formData.append('userId', userId);

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
      // Optionally, you can redirect the user to another page or perform any other action upon successful creation of the blog post.
    } catch (error) {
      if (error.response) {
        console.error('Server responded with error status:', error.response.status);
        console.error('Error details:', error.response.data);
      } else if (error.request) {
        console.error('No response received from server:', error.request);
      } else {
        console.error('Error setting up the request:', error.message);
      }
      // Handle error
    }
  };

  return (
    <>
    <Navigation/>
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-xl">

      <h2 className="text-2xl mb-4">Create a New Blog Post</h2>
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
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">User ID:</label>
          <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <button type="submit" onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Create Post</button>
      </form>
    </div>
    </>
  );
};

export default CreateBlog;
