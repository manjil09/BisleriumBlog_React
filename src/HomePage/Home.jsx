import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from '../NavBar/Navigation';
import Loader from '../components/Loader/Loader';
import { useNavigate } from 'react-router-dom';
import getUserDataFromToken from '../tokenUtils';
import { BAS_URL } from '../Constants';
import Footer from '../NavBar/Footer';
import NoPostsFoundMessage from '../components/NoPostsFoundMessage';
import TruncateText from '../components/TruncateText';
const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('recency'); // Default sort by recency
  const [pageIndex, setPageIndex] = useState(1);
  const [totalPages, setTotalPage] = useState(1);
  const url = `https://localhost:7271/api/blog/getAll?pageIndex=${pageIndex}&sortBy=${sortBy}`;
  let navigate = useNavigate();

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
  };

  const prevPage = () => {
    if (pageIndex === 1) return;
    setPageIndex(pageIndex - 1);
  };

  const nextPage = () => {
    if (pageIndex === totalPages) return;
    setPageIndex(pageIndex + 1);
  };

  // Now you can use getUserDataFromToken wherever needed
  const userData = getUserDataFromToken();
  if (userData) {
    console.log('User ID:', userData.userId);
    console.log('Name:', userData.name);
    console.log('Role:', userData.role);
  } else {
    console.log('Token not found in local storage');
  }

  return (
    <>
      <Navigation />
      <div className="container mx-auto bg-gray-300 p-4">

        <div className="relative flex justify-between items-center">
        <h2 className="text-2xl mb-4">Welcome to BisleriumBlog</h2>
        <div className="relative flex justify-between items-center">
          <h3 className="text-lg font-semibold mr-2">Sort By:</h3>
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="hover:border-gray-500 px-2 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="recency">Recent</option>
            <option value="popularity">Popularity</option>
            <option value="random">Random</option>
          </select>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {loading && <Loader />}
          {blogs.length > 0 ? (
            blogs.map((blog, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-md p-4 mb-4 mr-4 w-80 h-full"
                onClick={() => handleCardClick(blog.id)}
              >
                <img src={`${BAS_URL}/${blog.imageUrl}`} alt="Image" className="w-full h-64 mb-4 rounded-lg" />

                <div className="ml-2">
                  <h3 className="text-lg font-bold mb-2">{blog.title}</h3>
                  {/* Render truncated text with "See more" option */}
                  <TruncateText text={blog.body} maxLength={150} />
                  <p className="text-gray-700">
                    By: {blog.userName}
                  </p>
                  <p className="text-gray-600">
                    Last Updated: {new Date(blog.updatedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <NoPostsFoundMessage />
          )}
        </div>

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
      </div>
      <Footer />
    </>
  );
};

export default Home;
