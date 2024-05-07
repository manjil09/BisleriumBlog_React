import React from 'react';

const LoginMessage = ({ message, isSuccess }) => {
    return (
        <div className={`text-center ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
            {message}
        </div>
    );
};

export default LoginMessage;
