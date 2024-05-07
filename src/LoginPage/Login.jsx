import React, { useState } from 'react';
import Loader from '../componts/Loader/Loader';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

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
                // Redirect user to home page
                window.location.href = '/'; 
            } else {
                console.error('Login failed');
                // Handle login failure, e.g., display error message
            }
        } catch (error) {
            console.error('An error occurred:', error);
            // Handle network errors or other exceptions
        }
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
            </div>
            <div>
                {loading && <Loader />}
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="#" method="POST">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                            User Name
                        </label>
                        <div className="mt-2 ">
                            <input
                                id="username"
                                name="username"
                                type="text"
                                value={username}
                                onChange={handleUsernameChange}
                                autoComplete="username"
                                placeholder=' Enter Username'
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                                autoComplete="current-password"
                                placeholder=' Enter Password'
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        <br></br>
            
                         <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Forgot password?
                                </a>
                            </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            href ="/"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Login
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Don't have an account?{' '}
                    <a href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Create an Account
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
