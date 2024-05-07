import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg">
        {children}
        <button className="absolute top-0 right-0 mr-4 mt-2 text-gray-600" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
