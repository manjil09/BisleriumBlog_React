import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from '../NavBar/Navigation';
import { useParams } from 'react-router-dom';
import { FaThumbsUp, FaThumbsDown, FaEdit, FaTrash } from 'react-icons/fa';
import getUserDataFromToken from '../tokenUtils';
import { BAS_URL } from '../Constants';
import LoginDialogue from '../components/LoginDialogue';
import NoPostsFoundMessage from '../components/NoPostsFoundMessage';

const BlogView = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [commentsData, setCommentsData] = useState({ totalPages: 0, comments: [] });
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedCommentText, setEditedCommentText] = useState('');
  const authToken = JSON.parse(localStorage.getItem('token'));
  const userData = getUserDataFromToken();
  const [openLoginDialogue, setOpenLoginDialogue] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${authToken}`
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://localhost:7271/api/blog/getById/${id}`);
        const blogData = response.data.result;
        setBlog(blogData);
        setLikes(blogData.totalUpvotes);
        setDislikes(blogData.totalDownvotes);
        const commentsResponse = await axios.get(`https://localhost:7271/api/comment/getComments/${id}`);
        setCommentsData(commentsResponse.data.result);
      } catch (error) {
        console.error('Error fetching blog data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleUpvote = async () => {
    // Upvote logic...
  };

  const handleDownvote = async () => {
    // Downvote logic...
  };

  const handleComment = async () => {
    // Comment logic...
  };

  const handleUpdateComment = async (commentId) => {
    // Update comment logic...
  };

  const handleDeleteComment = async (commentId) => {
    setCommentToDelete(commentId);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = async () => {
    setShowDeleteConfirmation(false);
    try {
      await axios.delete(
        `https://localhost:7271/api/comment/delete/${commentToDelete}`,
        { headers: headers }
      );
      const commentsResponse = await axios.get(`https://localhost:7271/api/comment/getComments/${id}`);
      setCommentsData(commentsResponse.data.result);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  return (
    <>
      <Navigation />
      <div className="container mx-auto mt-8">
        <h2 className="text-2xl mb-4">Blog View</h2>
        {blog && (
          <div className="bg-gray shadow-md rounded-md p-6 mb-6">
            <div className="w-30 h-30">
              <img src={`${BAS_URL}/${blog.imageUrl}`} alt="Image" className="mx-auto w-64 h-full mb-4 rounded-lg"/>
            </div>
            <h3 className="text-lg font-bold mb-2">{blog.title}</h3>
            <p className="text-gray-700 mb-2">{blog.body}</p>
            <p className="text-gray-700">  By: {blog.userName} </p>
            <p className="text-gray-600">Blog Post Date: {new Date(blog.updatedAt).toLocaleString()}</p>
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center mt-4">
                <div className="flex items-center mr-4">
                  <FaThumbsUp
                    onClick={handleUpvote}
                    className={`cursor-pointer mr-1 ${likes ? 'text-blue-500' : 'text-gray-500'}`}
                  />
                  <span>{likes}</span>
                </div>
                <div className="flex items-center">
                  <FaThumbsDown
                    onClick={handleDownvote}
                    className={`cursor-pointer mr-1 ${dislikes ? 'text-red-500' : 'text-gray-500'}`}
                  />
                  <span>{dislikes}</span>
                </div>
              </div>
              <LoginDialogue open={openLoginDialogue} setOpen={() => setOpenLoginDialogue(false)} />
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
            {commentsData && commentsData.comments.length > 0 ? (
              commentsData.comments.map((comment, index) => (
                <li key={index} className="text-gray-600">
                  <strong>{comment.userName}:</strong> {comment.id === editingCommentId ? (
                    <>
                      <input
                        type="text"
                        value={editedCommentText}
                        onChange={(e) => setEditedCommentText(e.target.value)}
                        className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none"
                      />
                      <button onClick={() => handleUpdateComment(comment.id)} className="ml-2 bg-blue-500 text-white px-2 py-1 rounded-md">
                        Update
                      </button>
                    </>
                  ) : (
                    <>
                      {comment.body}
                      {comment.userId === userData?.userId && (
                        <>
                          <button onClick={() => {setEditingCommentId(comment.id); setEditedCommentText(comment.body);}} className="ml-2 text-blue-500">
                            <FaEdit />
                          </button>
                          <button onClick={() => handleDeleteComment(comment.id)} className="ml-2 text-red-500">
                            <FaTrash />
                          </button>
                        </>
                      )}
                    </>
                  )}
                </li>
              ))
            ) : (
              <NoPostsFoundMessage/>
            )}
          </ul>
          </div>
        )}
      </div>
      {showDeleteConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-75 z-50">
          <div className="bg-white p-4 rounded-md">
            <p>Do you want to delete this comment?</p>
            <div className="flex justify-end mt-4">
              <button onClick={confirmDelete} className="bg-red-500 text-white px-4 py-2 rounded-md mr-2">Yes</button>
              <button onClick={cancelDelete} className="bg-blue-500 text-white px-4 py-2 rounded-md">No</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogView;
