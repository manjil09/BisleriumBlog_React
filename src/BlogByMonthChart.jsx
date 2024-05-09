import React, { useState, useEffect } from 'react';
import Navigation from './NavBar/Navigation';
import axios from 'axios';

const Dashboard = () => {
    const [blogs, setBlogs] = useState([]);
    const authToken = JSON.parse(localStorage.getItem('token'));
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
    };

    useEffect(() => {
        axios.get('https://localhost:7271/api/blog/getByMonth?month=5&year=2024&sortBy=popularity&isAscending=false', { headers })
            .then(response => {
                setBlogs(response.data.result.blogs);
            })
            .catch(error => {
                console.error('Error fetching blogs:', error);
            });
    }, []); 

    return (
        <>
            <Navigation />
            <div className="mx-auto px-4 py-8">
                <h1 className="text-3xl font-semibold mb-4">Dashboard</h1>
                <p className="text-gray-600 mb-8">Welcome to the Dashboard!</p>
                <table className="table-auto">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">Title</th>
                            <th className="px-4 py-2">User Name</th>
                            <th className="px-4 py-2">Total Upvotes</th>
                            <th className="px-4 py-2">Total Downvotes</th>
                            <th className="px-4 py-2">Total Comments</th>
                            <th className="px-4 py-2">Popularity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map(blog => (
                            <tr key={blog.id}>
                                <td className="border px-4 py-2">{blog.id}</td>
                                <td className="border px-4 py-2">{blog.title}</td>
                                <td className="border px-4 py-2">{blog.userName}</td>
                                <td className="border px-4 py-2">{blog.totalUpvotes}</td>
                                <td className="border px-4 py-2">{blog.totalDownvotes}</td>
                                <td className="border px-4 py-2">{blog.totalComments}</td>
                                <td className="border px-4 py-2">{blog.popularity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Dashboard;
