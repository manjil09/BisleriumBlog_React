import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from '../NavBar/Navigation';
import { useParams } from 'react-router-dom';
import Loader from '../componts/Loader/Loader';
import getUserDataFromToken from '../tokenUtils';

const BlogView = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const authToken = JSON.parse(localStorage.getItem('token'));
  const userData = getUserDataFromToken();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://localhost:7271/api/blog/getById/${id}`);
        setBlog(response.data.result);
        // setLoading(true);
        // Fetch comments for the blog
        const commentsResponse = await axios.get(`https://localhost:7271/api/comment/getComments/${id}`);
        setComments(commentsResponse.data.result);
      } catch (error) {
        console.error('Error fetching blog data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleUpvote = () => {
    // Upvoting logic
  };

  const handleDownvote = () => {
    // Downvoting logic
  };

  const handleComment = async () => {
    try {
      // Make a POST request to add a comment
      const response = await axios.post(
        'https://localhost:7271/api/comment/add',
        {
          blogId: id,
          comment: commentText,
          userId:userData.id
        },
        {
          headers: {
            'Content-Type': 'application/json', // Specify the content type of the request body
            'Authorization': `Bearer ${authToken}`// Include any authorization token if required
          }
        }
      );
      // Update comments state to reflect the new comment
      setComments(prevComments => [...prevComments, response.data.result]);
      // Clear comment input field
      setCommentText('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };
  

  return (
    <>
      <Navigation />
      <div className="container mx-auto mt-8">
        <h2 className="text-2xl mb-4">Blog View</h2>
        {/* {loading && <Loader />} */}
        {blog && (
          <div className="bg-gray shadow-md rounded-md p-6 mb-6">
            <h3 className="text-lg font-bold mb-2">{blog.title}</h3>
            <p className="text-gray-700 mb-4">{blog.body}</p>
            <img src={blog.imageUrl} alt="Image" className="w-full mb-4 rounded-lg" />
            <p className="text-gray-600">Last Updated: {new Date(blog.updatedAt).toLocaleString()}</p>
            <div className="flex justify-between items-center mt-4">
              <div>
                <button onClick={handleUpvote} className="bg-green-500 text-white px-4 py-2 rounded-lg mr-4">
                  Upvote
                </button>
                <button onClick={handleDownvote} className="bg-red-500 text-white px-4 py-2 rounded-lg">
                  Downvote
                </button>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Add a comment"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                />
                <button onClick={handleComment} className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-2">
                  Add Comment
                </button>
              </div>
            </div>
            <ul className="mt-4">
              {comments!=null?(comments.map((comment, index) => (
                <li key={index} className="text-gray-600">{comment}</li>
              ))):(
            <p>No Comments found.</p>
                
              )}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default BlogView;
