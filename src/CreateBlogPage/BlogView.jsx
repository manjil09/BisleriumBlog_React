import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from '../NavBar/Navigation';
import { useParams } from 'react-router-dom';
import { FaThumbsUp,FaHeart, FaThumbsDown, FaEdit, FaTrash } from 'react-icons/fa';

import getUserDataFromToken from '../tokenUtils';
import { BAS_URL } from '../Constants';
import LoginDialogue from '../components/LoginDialogue';
import NoPostsFoundMessage from '../components/NoPostsFoundMessage';
import * as signalR from '@microsoft/signalr';

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
  const [hasUpvote, setHasUpvote] = useState(false);
  const [hasDownvote, setHasDownvote] = useState(false);
  const [openLoginDialogue, setOpenLoginDialogue] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${authToken}`
  };
  const [hubConnection, setHubConnection] = useState(null);

  useEffect(() => {
    // Initialize SignalR hub connection
    const initializeSignalR = async () => {
      const connection = new signalR.HubConnectionBuilder()
        .withUrl('https://localhost:7271/notification')
        .withAutomaticReconnect()
        .build();

      try {
        await connection.start();
        console.log('SignalR hub connection established');
        setHubConnection(connection);
      } catch (error) {
        console.error('Error establishing SignalR hub connection:', error);
      }
    };

    initializeSignalR();

    return () => {
      if (hubConnection) {
        hubConnection.stop();
        console.log('SignalR hub connection stopped');
      }
    };
  }, []);

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
        checkHasUpvoteOrDownvote();
      } catch (error) {
        console.error('Error fetching blog data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);
  const sendNotification = async (response, type) => {
    let creatorId = response.data.result.blogCreatorId
    console.log('Upvote successful ' + response.data.result.blogCreatorId + ' kd ' + response.data.result.type);
    // Send notification to the creator
    if (hubConnection && blog) {
      await hubConnection.send('SendNotification', creatorId, type);
      console.log('Notification sent to the creator');
    } else {
      console.log('Notification sent error');
    }
  }
  const handleUpvote = async () => {
    if (!userData) {
      setOpenLoginDialogue(true);
      return;
    }
    try {
      const response = await axios.post(
        `https://localhost:7271/api/blog/reaction/upvote?blogId=${id}&userId=${userData.userId}`,
        {},
        { headers: headers }
      );
      setLikes(response.data.result.totalUpvotes);
      setDislikes(response.data.result.totalDownvotes);
      checkHasUpvoteOrDownvote();
      sendNotification(response, `Someone toggled upvote in your blog.`);
      console.log('Upvote successful');
    } catch (error) {
      console.error('Error upvoting:', error);
    }
  };

  const handleDownvote = async () => {
    if (!userData) {
      setOpenLoginDialogue(true);
      return;
    }
    try {
      const response = await axios.post(
        `https://localhost:7271/api/blog/reaction/downvote?blogId=${id}&userId=${userData.userId}`,
        {},
        { headers: headers }
      );
      console.log('Downvote successful');
      setLikes(response.data.result.totalUpvotes);
      setDislikes(response.data.result.totalDownvotes);
      checkHasUpvoteOrDownvote();
      sendNotification(response, `Someone toggled downvote in your blog.`);
    } catch (error) {
      console.error('Error downvoting:', error);
    }
  };

  const handleCommentUpvote = async (commentId) => {
    if (!userData) {
      setOpenLoginDialogue(true);
      return;
    }
    try {
      const response = await axios.post(
        `https://localhost:7271/api/comment/reaction/upvote?commentId=${commentId}&userId=${userData.userId}`,
        {},
        { headers: headers }
      );
      console.log('Comment Upvote successful.');
      window.location.reload();
    } catch (error) {
      console.error('Error comment upvoting:', error);
    }
  };
  const handleCommentDownvote = async (commentId) => {
    if (!userData) {
      setOpenLoginDialogue(true);
      return;
    }
    try {
      const response = await axios.post(
        `https://localhost:7271/api/comment/reaction/downvote?commentId=${commentId}&userId=${userData.userId}`,
        {},
        { headers: headers }
      );
      console.log('Comment Downvote successful');
      window.location.reload();
    } catch (error) {
      console.error('Error Comment downvoting:', error);
    }
  };
  const handleComment = async () => {
    if (!userData) {
      setOpenLoginDialogue(true);
      return;
    }
    try {
      const response = await axios.post(
        'https://localhost:7271/api/comment/add',
        {
          blogId: id,
          body: commentText,
          userId: userData.userId
        },
        { headers: headers }
      );
      setCommentsData(prevCommentsData => ({
        totalPages: prevCommentsData.totalPages,
        comments: [...prevCommentsData.comments, response.data.result]
      }));
      window.location.reload();
      sendNotification(response, 'Someone commented on your blog.');
      setCommentText('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const checkHasUpvoteOrDownvote = async () => {
    try {
      const reactionResponse = await axios.get(
        `https://localhost:7271/api/blog/reaction/getUserReactions/${id}/${userData.userId}`,
        { headers: headers }
      );
      console.log(reactionResponse.data.result.type);
      let reactionResult = reactionResponse.data.result;
      if (reactionResult) {
        if (reactionResult.type === 0) {
          setHasUpvote(true);
          setHasDownvote(false);
        } else {
          setHasDownvote(true);
          setHasUpvote(false);
        }
      }
    } catch (error) {
      console.log('Error adding comment:', error);
    }
  }

  const handleUpdateComment = async (commentId) => {
    try {
      await axios.put(
        `https://localhost:7271/api/comment/update/${commentId}`,
        { body: editedCommentText },
        { headers: headers }
      );
      const commentsResponse = await axios.get(`https://localhost:7271/api/comment/getComments/${id}`);
      setCommentsData(commentsResponse.data.result);
      setEditingCommentId(null);
      setEditedCommentText('');
    } catch (error) {
      console.error('Error updating comment:', error);
    }
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
              <img src={`${BAS_URL}/${blog.imageUrl}`} alt="Image" className="mx-auto w-64 h-full mb-4 rounded-lg" />
            </div>
            <h3 className="text-lg font-bold mb-2">{blog.title}</h3>
            <p className="text-gray-700 mb-2">{blog.body}</p>
            <p className="text-gray-700">  By: {blog.userName} </p>
            <p className="text-gray-600">Blog Post Date: {new Date(blog.updatedAt).toLocaleString()}</p>
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center mt-4">
                <div className="flex items-center mr-4">
                  <FaThumbsUp
                    onClick={() => {
                      handleUpvote();
                      setHasUpvote(!hasUpvote);
                    }}
                    className={`cursor-pointer mr-1 ${hasUpvote ? 'text-blue-500' : 'text-gray-500'}`}
                  />
                  <span>{likes}</span>
                </div>
                <div className="flex items-center">
                  <FaThumbsDown
                    onClick={() => {
                      handleDownvote();
                      setHasDownvote(!hasDownvote)
                    }}
                    className={`cursor-pointer mr-1 ${hasDownvote ? 'text-red-500' : 'text-gray-500'}`}
                  />
                  <span>{dislikes}</span>
                </div>
              </div>
              <LoginDialogue open={openLoginDialogue} setOpen={() => setOpenLoginDialogue(false)} />

            </div>
            <br />
            <div >
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
            <ul className="mt-4">
              {commentsData && commentsData.comments && commentsData.comments.length > 0 ? (
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
                        <div className="flex items-center mt-1">
                          <div className="flex items-center mr-4">
                            <FaHeart
                              onClick={() => handleCommentUpvote(comment.id)}
                              className={`cursor-pointer mr-1 }`}
                              
                            />
                            <span>{comment.totalUpvotes}</span>
                          </div>
                          <div className="flex items-center" >
                            <FaHeart
                              onClick={() => handleCommentDownvote(comment.id)}
                              className={`cursor-pointer mr-1 `}
                            />
                            <span>{comment.totalDownvotes}</span>
                          </div>
                        </div>

                        {comment.userId === userData?.userId && (
                          <>
                            <button onClick={() => { setEditingCommentId(comment.id); setEditedCommentText(comment.body); }} className="ml-2 mt-1 text-blue-500">
                              <FaEdit />
                            </button>
                            <button onClick={() => handleDeleteComment(comment.id)} className="ml-6 mt-2 text-red-500">
                              <FaTrash />
                            </button>
                          </>
                        )}
                        <hr /><br />
                      </>
                    )}
                  </li>
                ))
              ) : (
                <NoPostsFoundMessage />
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
