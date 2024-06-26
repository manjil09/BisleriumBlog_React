// Register.js
import React, { useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader/Loader';
import ToastMessage from '../components/ToastMessage'; 
import { ToastContainer, toast } from 'react-toastify';

const Register = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
        const [registerMessage, setRegisterMessage] = useState(''); // State for registration message

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const notify = () => toast(registerMessage);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://localhost:7271/api/user/register', {
                method: 'POST',
                userName: username,
                userEmail: email,
                password: password,
            });

            setLoading(true);
                setRegisterMessage('User register successful')
                notify();
                try {
                    const response = await fetch('https://localhost:7271/api/user/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ username, password }),
                    });
        
                    if (response.ok) {
                        console.log('User Login successful!');
                        const data = await response.json();
                        const token = data.result;
                        console.log('Token:', token); // Log token data to console
                        localStorage.setItem('token', JSON.stringify(token)); // Save token to local storage
        
                        setLoading(true);
                        setRegisterMessage('Login successful!'); // Set success message
                        notify();// Set generic error message
                // Redirect user to home page
                        window.location.href = '/';
                    } else {
                        console.error('Login failed');
                        setRegisterMessage('Invalid username or password!'); // Set failure message
                       notify();// Set generic error message
                // Handle login failure, e.g., display error message
                    }
                } catch (error) {
                    console.error('An error occurred:', error);
                    setRegisterMessage('An error occurred. Please try again later.'); // Set failure message
                notify();// Set generic error message
                // Handle network errors or other exceptions
                }
            
            console.log('message:', response.data);
            // You can add additional logic here, such as redirecting the user to a login page or displaying a success message
        } catch (error) {
            console.error('Registration failed:', error);
            setLoading(false);
            // setRegisterMessage('Registration Failed'); // Set error message from server response
            // notify();// Set generic error message

            if (error.response) {
                // Server responded with an error status code
                console.error('Error response from server:', error.response.data);
                setRegisterMessage(error.response.data); // Set error message from server response
                notify();// Set generic error message
            } else if (error.request) {
                // The request was made but no response was received
                console.error('No response received from server:', error.request);
                setRegisterMessage(error.response.data); 
                notify();// Set generic error message
            } else {
                // Something happened in setting up the request that triggered an error
                console.error('Error while setting up request:', error.message);
                setRegisterMessage(error.response.data); // Set generic error message
                notify();// Set generic error message
            }
        }
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Register an Account
                </h2>
            </div>
            <div>
                {loading && <Loader />}
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                {/* Render register message component */}
                {registerMessage.message && (
                    <ToastMessage message={registerMessage.message} isSuccess={registerMessage.isSuccess} />
                )}
                <div>
        <ToastContainer />
      </div>

                <form className="space-y-6" action="#" method="POST">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                autoComplete="email"
                                placeholder='Enter your email'
                                required
                                className="block w-full rounded-md border-0 py-1.5 pl-4 pr-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                            User Name
                        </label>
                        <div className="mt-2">
                            <input
                                id="username"
                                name="username"
                                type="username"
                                value={username}
                                onChange={handleUsernameChange}
                                autoComplete="username"
                                placeholder='Enter your name'
                                required
                                className="block w-full rounded-md border-0 py-1.5 pl-4 pr-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                            Password
                        </label>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                                autoComplete="new-password"
                                placeholder='Enter password'
                                required
                                className="block w-full rounded-md border-0 py-1.5 pl-4 pr-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Register
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Already have an account?{' '}
                    <a href="./" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Register;
