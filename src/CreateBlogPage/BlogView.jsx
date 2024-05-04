import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from '../NavBar/Navigation';
import Loader from '../componts/Loader/Loader';
import { useParams } from 'react-router-dom';



const BlogView = () => {
  const {id} = useParams();
  const [blog, setBlogs] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://localhost:7271/api/blog/getById/${id}`);
        setBlogs(response.data.result);
        console.log('message:', response.data.result);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching blog data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUpvote = (id) => {
    // Increment the upvote count of the blog post at the specified index
    // const updatedBlogs = [...blogs];
    // updatedBlogs[index].upvotes += 1;
    // setBlogs(updatedBlogs);
    // Send the updated upvote count to the server
    // You can use axios.post() to send the updated data to the server
  };

  const handleDownvote = (id) => {
    // Decrement the downvote count of the blog post at the specified index
    // const updatedBlogs = [...blog];
    // updatedBlogs[index].downvotes += 1;
    // setBlogs(updatedBlogs);
    // Send the updated downvote count to the server
    // You can use axios.post() to send the updated data to the server
  };

  // const handleComment = (index, comment) => {
  //   // Add the comment to the blog post at the specified index
  //   const updatedBlogs = [...blogs];
  //   updatedBlogs[index].comments.push(comment);
  //   setBlogs(updatedBlogs);
  //   // Send the updated comment to the server
  //   // You can use axios.post() to send the updated data to the server
  // };

  return (
    <>
      <Navigation />
      <div className="container mx-auto mt-8">
        <h2 className="text-2xl mb-4">Blog View</h2>
        <div>
              {loading && <Loader/>}
              
            </div>
          <div>
            {blog != null ? (
                <div key={id} className="bg-gray shadow-md rounded-md p-6 mb-6">
                  <h3 className="text-lg font-bold mb-2">{blog.title}</h3>
                  <p className="text-gray-700 mb-4">{blog.body}</p>
                  <img src={blog.image} alt="Image" className="w-full mb-4 rounded-lg" />
                  <p className="text-gray-600">User ID: {blog.userId}</p>
                  <p className="text-gray-600">Last Updated: {new Date(blog.updatedAt).toLocaleString()}</p>
                  <div className="flex justify-between items-center mt-4">
                    <div>
                      <button onClick={() => handleUpvote(id)} className="bg-green-500 text-white px-4 py-2 rounded-lg mr-4">
                        Upvote
                      </button>
                      <button onClick={() => handleDownvote(id)} className="bg-red-500 text-white px-4 py-2 rounded-lg">
                        Downvote
                      </button>
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Add a comment"
                        // onChange={(e) => handleComment(index, e.target.value)}
                        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                      />
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-2">
                        Add Comment
                      </button>
                    </div>
                  </div>
                  {/* <ul className="mt-4">
                    {blog.comments.map((comment, commentIndex) => (
                      <li key={commentIndex} className="text-gray-600">{comment}</li>
                    ))}
                  </ul> */}
                </div>
              
            ) : (
              <p>No blogs found.</p>
            )}
          </div>
        
      </div>
    </>
  );
};

export default BlogView;
