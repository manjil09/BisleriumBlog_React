import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from '../NavBar/Navigation';
import Loader from '../componts/Loader/Loader';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  let navigate = useNavigate();
  const handleCardClick = (index) => {
    let path = `/blogView/${index}`;
    navigate(path);
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7271/api/blog/getAll');
        setBlogs(response.data.result.blogs);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blog data:', error);
        setLoading(false);
      }
    };

    fetchData();

  }, []);

  return (
    <>
      <Navigation />
      <div className="container mx-auto mt-8 bg-gray-300 p-4">
        <h2 className="text-2xl mb-4">Wel come to BisleriumBlog</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {loading && <Loader />}
          {blogs.length > 0 ? (
            blogs.map((blog, index) => (
              <div key={index} className="bg-white shadow-md rounded-md p-4 mb-4 mr-4 w-80 h-full" onClick={()=>{handleCardClick(blog.id)}}>
                {/* <img src={blog.image} alt="Image" className="w-full mb-4 rounded-lg" /> */}
                <img
                  class="object-cover object-center w-full h-full"
                  src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2832&amp;q=80"
                  alt="nature image"
                />
                <div className="ml-2">
                  <h3 className="text-lg font-bold mb-2">{blog.title}</h3>
                  <p className="text-gray-700 ">{blog.body}</p>
                  <p className="text-gray-600">User ID: {blog.userId}</p>
                  <p className="text-gray-600">Last Updated: {new Date(blog.updatedAt).toLocaleString()}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No blogs found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
