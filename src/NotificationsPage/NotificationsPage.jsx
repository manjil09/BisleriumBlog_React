import React, { useEffect, useState } from 'react';
import Navigation from '../NavBar/Navigation';
import { HubConnectionBuilder } from '@microsoft/signalr';
import * as signalR from '@microsoft/signalr';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [connection, setConnection] = useState(null);

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

  return (
    <div>
      <Navigation />

      <div className="relative flex justify-between items-center">
        <h2 className="text-2xl mb-4 mt-4 ml-4">Notifications</h2>
      </div >
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification}</li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationsPage;
