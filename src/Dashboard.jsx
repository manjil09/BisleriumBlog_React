import React, { useState, useEffect } from 'react';
import Navigation from './NavBar/Navigation';
import axios from 'axios';
import Footer from './NavBar/Footer';

const Dashboard = () => {
    const [blogs, setBlogs] = useState([]);
    const authToken = JSON.parse(localStorage.getItem('token'));
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
    };

    const [queryParams, setQueryParams] = useState({
        month: '',
        year: '',
        sortBy: 'popularity',
        isAscending: false,
        pageIndex: '',
        pageSize: ''
    });

    const handleMonthChange = (e) => {
        setQueryParams({ ...queryParams, month: e.target.value });
    };

    const handleYearChange = (e) => {
        setQueryParams({ ...queryParams, year: e.target.value });
    };

    const handleSortByChange = (e) => {
        setQueryParams({ ...queryParams, sortBy: e.target.value });
    };

    const handleIsAscendingChange = (e) => {
        setQueryParams({ ...queryParams, isAscending: e.target.value === "true" });
    };

    const handlePageIndexChange = (e) => {
        setQueryParams({ ...queryParams, pageIndex: e.target.value });
    };

    const handlePageSizeChange = (e) => {
        setQueryParams({ ...queryParams, pageSize: e.target.value });
    };

    useEffect(() => {
        axios.get('https://localhost:7271/api/blog/getByMonth', {
            params: queryParams,
            headers: headers
        })
        .then(response => {
            setBlogs(response.data.result.blogs);
        })
        .catch(error => {
            console.error('Error fetching blogs:', error);
        });
    }, [queryParams, headers]);

    // Generate options for months and years
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const years = Array.from({ length: 10 }, (_, i) => 2022 + i); // Generate options for 10 years from 2022

    return (
        <>
            <Navigation />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center mb-4 font-bold text-2xl">Welcome to the Admin Dashboard</div>
                <div className="mt-4 flex space-x-4">
                    <div>
                        <label htmlFor="month">Month:</label>
                        <select id="month" onChange={handleMonthChange} value={queryParams.month} className="border border-gray-300 rounded-md">
                            <option value="">Select Month</option>
                            {months.map(month => (
                                <option key={month} value={month}>{month}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="year">Year:</label>
                        <select id="year" onChange={handleYearChange} value={queryParams.year} className="border border-gray-300 rounded-md">
                            <option value="">Select Year</option>
                            {years.map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="sortBy">Sort By:</label>
                        <select id="sortBy" onChange={handleSortByChange} value={queryParams.sortBy} className="border border-gray-300 rounded-md">
                            <option value="popularity">Popularity</option>
                            <option value="date">Date</option>
                            {/* Add options for other sorting */}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="isAscending">Ascending:</label>
                        <select id="isAscending" onChange={handleIsAscendingChange} value={queryParams.isAscending} className="border border-gray-300 rounded-md">
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="pageIndex">Page Index:</label>
                        <input type="number" id="pageIndex" value={queryParams.pageIndex} onChange={handlePageIndexChange} className="border border-gray-300 rounded-md" />
                    </div>
                    <div>
                        <label htmlFor="pageSize">Page Size:</label>
                        <input type="number" id="pageSize" value={queryParams.pageSize} onChange={handlePageSizeChange} className="border border-gray-300 rounded-md" />
                    </div>
                </div>
                <table className="mt-8 w-full border-collapse border border-gray-400">
                    <thead>
                        <tr>
                            <th className="border border-gray-400 px-4 py-2">ID</th>
                            <th className="border border-gray-400 px-4 py-2"> Blog Title</th>
                            <th className="border border-gray-400 px-4 py-2">User Name</th>
                            <th className="border border-gray-400 px-4 py-2">Total Upvotes</th>
                            <th className="border border-gray-400 px-4 py-2">Total Downvotes</th>
                            <th className="border border-gray-400 px-4 py-2">Total Comments</th>
                            <th className="border border-gray-400 px-4 py-2">Popularity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map(blog => (
                            <tr key={blog.id}>
                                <td className="border border-gray-400 px-4 py-2">{blog.id}</td>
                                <td className="border border-gray-400 px-4 py-2">{blog.title}</td>
                                <td className="border border-gray-400 px-4 py-2">{blog.userName}</td>
                                <td className="border border-gray-400 px-4 py-2">{blog.totalUpvotes}</td>
                                <td className="border border-gray-400 px-4 py-2">{blog.totalDownvotes}</td>
                                <td className="border border-gray-400 px-4 py-2">{blog.totalComments}</td>
                                <td className="border border-gray-400 px-4 py-2">{blog.popularity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Footer/>
        </>
    );
};

export default Dashboard;
