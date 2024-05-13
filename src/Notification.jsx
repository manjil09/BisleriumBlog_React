import React, { useState } from 'react';

const Notification = ({ message }) => {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <>
      {visible && (
        <div className="notification">
          <p>{message}</p>
          <button onClick={handleClose}>Close</button>
        </div>
      )}
    </>
  );
};

export default Notification;
