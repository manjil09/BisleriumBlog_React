import React from 'react';

const ToastMessage = ({ message, isSuccess }) => {
    return (
        <div className={`text-center ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
            {message}
        </div>
    );
};

export default ToastMessage;
