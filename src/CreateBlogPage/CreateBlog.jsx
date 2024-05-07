import React, { useState } from 'react';
import axios from 'axios';
import Navigation from '../NavBar/Navigation';
import getUserDataFromToken from '../tokenUtils';


const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState(null); // Change to null
  const authToken = JSON.parse(localStorage.getItem('token'));

   // Now you can use getUserDataFromToken wherever needed
   const userData = getUserDataFromToken();
   console.log("messageToken" ,authToken)

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
      window.location.href = '/myBlog'; 

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
            <button type="submit" onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Create Post</button>
          </form>
        </div>
        
  );
};

export default CreateBlog;
