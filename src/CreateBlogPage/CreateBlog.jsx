import React, { useState } from 'react';
import axios from 'axios';
import Navigation from '../NavBar/Navigation';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState('');
  const [userId, setUserId] = useState('');
  const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiUmFtdSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlVzZXIiLCJleHAiOjE3MTQ1Nzk1MDAsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjcyNzEvIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzI3MS8ifQ.qvNk7tKuh2Mwp_gMB7Qj1ZcYX8YeOKS4dXjGJ5hdpAE'; // Replace 'your_auth_token_here' with your actual authentication token


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(
        'https://localhost:7271/api/blog/add',
        {
          title,
          body,
          image,
          userId
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`
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
          <label className="block text-gray-700 text-sm font-bold mb-2">Image URL:</label>
          <input type="text" value={image} onChange={(e) => setImage(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
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
