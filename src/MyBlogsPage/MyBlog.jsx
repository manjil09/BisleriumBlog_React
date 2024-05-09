import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import Navigation from '../NavBar/Navigation';
import getUserDataFromToken from '../tokenUtils';
import { FaPlus, FaSearch } from 'react-icons/fa';
import Modal from '../Modal';
import CreateBlog from '../CreateBlogPage/CreateBlog';
import Footer from '../NavBar/Footer';
import NoPostsFoundMessage from '../components/NoPostsFoundMessage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const BAS_URL = "https://localhost:7271/";

function MyBlog() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedBody, setUpdatedBody] = useState('');
  const [updatedImage, setUpdatedImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const userData = getUserDataFromToken();
  const authToken = JSON.parse(localStorage.getItem('token'));
  const headers = {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${authToken}`
  };
  const notify = () => toast(errorMessage);

  const filteredBlogPosts = blogPosts.filter(post => {
    return post.title.toLowerCase().includes(searchTerm.toLowerCase());
  });


  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const response = await axios.get(`https://localhost:7271/api/blog/getByUserId/${userData.userId}`);
      setBlogPosts(response.data.result);
    } catch (error) {
      console.error('Error fetching blog data:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await axios.delete(`https://localhost:7271/api/blog/delete/${id}`, { headers });
        fetchBlogPosts();
      window.location.reload();

      } catch (error) {
        console.error('Error deleting blog post:', error);
      }
    }
  };

  const handleUpdate = async (id) => {
    if (!updatedImage) {
      setErrorMessage('Image is required');
      notify();
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', updatedTitle);
      formData.append('body', updatedBody);
      formData.append('image', updatedImage);
      const response = await axios.put(
        `https://localhost:7271/api/blog/update/${id}`,
        formData,
        { headers }
      );

      if (response.status === 200) {
        fetchBlogPosts();
        setEditingBlog(null);
        setUpdatedTitle('');
        setUpdatedBody('');
        setUpdatedImage(null);
      } else {
        console.error('Failed to update blog post. Server responded with status:', response.status);
      }
    } catch (error) {
      console.error('Error updating blog post:', error);
      if (error.response) {
        console.error('Server responded with error status:', error.response.status);
        console.error('Error details:', error.response.data);
      } else {
        console.error('No response received from server.');
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setUpdatedImage(file);
  };

 
  return (
    <>
      <Navigation />
      <div className="container mx-auto bg-gray-300 p-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold">My Blog Page</h1>
          <div className="flex items-center">
            <div className="relative mr-4">
              <input
                type="text"
                placeholder="Search"
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute right-3 top-3 text-gray-500" />
            </div>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-green-600 flex items-center"
              onClick={() => setIsCreateModalOpen(true)}
            >
              <FaPlus className="mr-2" />
              Create Blog
            </button>
          </div>
        </div>
        {filteredBlogPosts.length === 0 ? (
          <NoPostsFoundMessage/>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogPosts.map(post => (
              <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                <img src={`${BAS_URL}/${post.imageUrl}`} alt="Blog Image" className="w-full h-64 object-cover" />
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
        <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
          <CreateBlog onClose={() => setIsCreateModalOpen(false)} />
        </Modal>
        {editingBlog && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Edit Blog</h2>
              <input type="text" className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full" placeholder="Title" value={updatedTitle} onChange={(e) => setUpdatedTitle(e.target.value)} />
              <textarea className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full" placeholder="Body" value={updatedBody} onChange={(e) => setUpdatedBody(e.target.value)} />
              <input type="file" accept="image/*" onChange={handleImageChange} />
              <div className="flex justify-end mt-4">
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2" onClick={() => handleUpdate(editingBlog.id)}>Save</button>
                <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600" onClick={() => setEditingBlog(null)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default MyBlog;
