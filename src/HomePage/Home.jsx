import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from '../NavBar/Navigation';
import Loader from '../componts/Loader/Loader';
import { useNavigate } from 'react-router-dom';
// import getUserDataFromToken from './tokenUtils.js';

import Pagination from '../componts/Pagination';
import getUserDataFromToken from '../tokenUtils';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('recency'); // Default sort by recency
  const [pageIndex, setPageIndex] = useState(1);
  const [totalPages, setTotalPage] = useState(1);
  const url = `https://localhost:7271/api/blog/getAll?pageIndex=${pageIndex}&sortBy=${sortBy}`;
  let navigate = useNavigate()

  const handleCardClick = (index) => {
    let path = `/blogView/${index}`;
    navigate(path);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setBlogs(response.data.result.blogs);
        setTotalPage(response.data.result.totalPages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blog data:', error);
        setLoading(false);
      }
    };

    fetchData();

  }, [url]); // Include sortBy in dependency array

  const handleSortChange = (sortByValue) => {
    setSortBy(sortByValue);
  };

  const handlePagination = (pageIndex) => {
    setPageIndex(pageIndex);
  }

  const prevPage = () => {
    if (pageIndex === 1) return;
    setPageIndex(pageIndex - 1);
  };

  const nextPage = () => {
    if (pageIndex === totalPages) return;
    setPageIndex(pageIndex + 1);
  };


  return (
    <>
      <Navigation />
      <div className="container mx-auto bg-gray-300 p-4">
        <h2 className="text-2xl mb-4">Welcome to BisleriumBlog</h2>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Sort By:</h3>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="recency">Recency</option>
              <option value="popularity">Popularity</option>
              <option value="random">Random</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 11.293a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L10 12.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          {loading && <Loader />}
          {blogs.length > 0 ? (
            blogs.map((blog, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-md p-4 mb-4 mr-4 w-80 h-full"
                onClick={() => {
                  handleCardClick(blog.id);
                }}
                
              >
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
                  <p className="text-gray-600">
                    Last Updated: {new Date(blog.updatedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No blogs found.</p>
          )}
        </div>
        {/* Pagination */}
        <div className="flex justify-center mt-4">
          {[...Array(totalPages).keys()].map((page) => (
            <button
              key={page}
              onClick={() => handlePagination(page + 1)}
              className={`px-4 py-2 mx-1 rounded-lg ${pageIndex === page + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'}`}
            >
              {page + 1}
            </button>
          ))}
        </div>
        <div>
          {/* error when using pagination component */}
          {/* <Pagination active={pageIndex} setActive={setPageIndex} prev={prevPage} next={nextPage} totalPages={totalPages} /> */}
        </div>
      </div>
    </>
  );
};

export default Home;
