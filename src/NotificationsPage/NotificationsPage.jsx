import React, { useEffect, useState } from 'react';
import Navigation from '../NavBar/Navigation';
import { HubConnectionBuilder } from '@microsoft/signalr';
import * as signalR from '@microsoft/signalr';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [connection, setConnection] = useState(null);
  const [comment, setComment] = useState('');

  useEffect(() => {
    // Create the SignalR connection
    const newConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:7271/notification', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .build();

    setConnection(newConnection); // Store the connection in state

    return () => {
      // Clean up connection when component unmounts
      if (newConnection) {
        newConnection.off('ReceiveNotification');
        newConnection.stop();
      }
    };
  }, []);

  useEffect(() => {
    // Start the connection when it is initialized
    if (connection) {
      connection.start()
        .then(() => console.log('Connected to SignalR hub'))
        .catch(err => console.error('Error connecting to SignalR hub:', err));

      // Handle incoming notifications
      connection.on('ReceiveNotification', (message) => {
        console.log('Received notification:', message);
        // Update notifications state
        setNotifications(prevNotifications => [...prevNotifications, message]);
      });
    }
  }, [connection]);

  const handleCommentSubmit = () => {
    // Send comment via SignalR
    connection.invoke('SendComment', comment)
      .catch(err => console.error('Error sending comment:', err));
    // Clear comment input field
    setComment('');
  };

  return (
    <div>
      <Navigation />

      <div className="relative flex justify-between items-center">
        <h2 className="text-2xl mb-4 mt-4 ml-4">Notifications</h2>
      </div >

      {/* Comment input field */}
      <div className="mb-4 ml-4">
        <input
          type="text"
          placeholder="Leave a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 mr-2"
        />
        <button
          onClick={handleCommentSubmit}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded px-3 py-1"
        >
          Submit
        </button>
      </div>

      {/* Notifications list */}
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification}</li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationsPage;
