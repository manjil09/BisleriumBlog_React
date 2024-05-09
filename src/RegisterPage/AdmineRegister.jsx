import React, { useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader/Loader';
import ToastMessage from '../components/ToastMessage'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navigation from '../NavBar/Navigation';

const AdmineRegister = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [registerMessage, setRegisterMessage] = useState('');
    const authToken = JSON.parse(localStorage.getItem('token'));
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
    };

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
            const response = await axios.post('https://localhost:7271/api/user/registerAdmin', {
                method: 'POST',
                userName: username,
                userEmail: email,
                password: password,
            },{},{headers});

            setLoading(true);
            setRegisterMessage('Admin register successful')
            notify();
            // Redirect user to home page or perform other actions
        } catch (error) {
            console.error('Registration failed:', error);
            setLoading(false);
    
            if (error.response) {
                console.error('Error response from server:', error.response.data);
                setRegisterMessage(error.response.data.message);
            } else {
                console.error('Network error or other exception:', error.message);
                setRegisterMessage('An error occurred during registration.');
            }
    
            setRegisterMessage('An error occurred during registration.');
            notify(); // Display the error message
        
        }
    };

    return (
        <>
        <Navigation/>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                     Create Admin Register Account
                </h2>
            </div>
            <div>
                {loading && <Loader />}
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
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
            </div>
        </div>

        </>
    );
};

export default AdmineRegister;
