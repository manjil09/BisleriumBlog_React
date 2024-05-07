// Import useState for managing state variables
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming you are using axios for API calls
import moment from 'moment'; // For formatting timestamps
import Navigation from '../NavBar/Navigation';
import getUserDataFromToken from '../tokenUtils';
import { useParams } from 'react-router-dom';
export const  BAS_URL ="https://localhost:7271/"

function MyBlog() {
  // State variables for managing blog posts, editing state, and updated data
  const [blogPosts, setBlogPosts] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedBody, setUpdatedBody] = useState('');
  const [updatedImage, setUpdatedImage] = useState('');
  const userData = getUserDataFromToken();
  const userId = userData.userId;


  // Fetch blog posts on component mount
  useEffect(() => {
    fetchBlogPosts();
  }, []);

  // Function to fetch blog posts
  const fetchBlogPosts = async () => {
    try {
      const response = await axios.get(`https://localhost:7271/api/blog/getByUserId/${userId}`);
      setBlogPosts(response.data.result);
    } catch (error) {
      console.error('Error fetching blog data:', error);
    }
  };

  // Function to handle deletion of a blog post
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://localhost:7271/api/blog/delete/${id}`);
      fetchBlogPosts();
    } catch (error) {
      console.error('Error deleting blog post:', error);
    }
  };

  // Function to handle update of a blog post
  const handleUpdate = async(id) => {
    try {
      await axios.put(`https://localhost:7271/api/blog/update/${id}`, {
        title: updatedTitle,
        body: updatedBody,
        imageUrl: updatedImage,
        userId: userId
      });
      fetchBlogPosts();
      setEditingBlog(null);
    } catch (error) {
      console.error('Error updating blog post:', error);
    }
  };

  // Function to handle image selection
const handleImageChange = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onloadend = () => {
    setUpdatedImage(reader.result); // Set updated image state
  };
  if (file) {
    reader.readAsDataURL(file);
  }
};


  return (
    <>
      <Navigation />
      <div className="container mx-auto bg-gray-300 p-4">
        <h1 className="text-3xl font-semibold mb-8">My Blog Page</h1>
        {blogPosts.length === 0 ? (
          <p className="text-lg">You have no blog posts yet.</p>
        ) : (
          <div className="space-y-6">
            {blogPosts.map(post => (
              <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col md:flex-row items-center">
               
              <img src={`${BAS_URL}/${post.imageUrl}`} alt="Blog Image"  />

              
                
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                  <p className="text-gray-700 mb-4">{post.body}</p>
                  <p className="text-sm text-gray-500">Blog Post Date: {moment(post.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
                  <div className="flex mt-4">
                    <button className="mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => setEditingBlog(post)}>Edit</button>
                    <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" onClick={() => handleDelete(post.id)}>Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Edit Blog Modal */}
        {editingBlog && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Edit Blog</h2>
              <input type="text" className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full" placeholder="Title" value={updatedTitle} onChange={(e) => setUpdatedTitle(e.target.value)} />
              <textarea className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full" placeholder="Body" value={updatedBody} onChange={(e) => setUpdatedBody(e.target.value)} />
              Image selection input  
              <input type="file" accept="image/*" onChange={handleImageChange} />
              <div className="flex justify-end mt-4">
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2" onClick={() => handleUpdate(editingBlog.id)}>Save</button>
                <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600" onClick={() => setEditingBlog(null)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default MyBlog;
