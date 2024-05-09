import React, { useEffect, useState } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl('https://your-backend-url/notificationHub')
      .build();

    connection.start()
      .then(() => console.log('Connected to SignalR hub'))
      .catch(err => console.error('Error connecting to SignalR hub:', err));

    connection.on('ReceiveNotification', (message) => {
      console.log('Received notification:', message);
      setNotifications(prevNotifications => [...prevNotifications, message]);
    });

    return () => {
      connection.off('ReceiveNotification');
      connection.stop();
    };
  }, []);

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification}</li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationsPage;
