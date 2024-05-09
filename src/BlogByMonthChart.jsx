import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto'; // Import Chart.js directly

const BlogByMonthChart = () => {
  const [blogData, setBlogData] = useState([]);
  const authToken = JSON.parse(localStorage.getItem('token'));
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${authToken}`
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Dynamically construct the query parameters based on some other data
        const queryParams = new URLSearchParams({
          month: getMonth(), // Call a function to get the month value dynamically
          year: getYear(), // Call a function to get the year value dynamically
          sortBy: 'popularity', // Example sortBy value, replace with actual value
          isAscending: false // Example isAscending value, replace with actual value
        });

        // Make the API call with the constructed URL
        const response = await axios.get(`https://localhost:7271/api/blog/getByMonth?${queryParams}`, { headers });
        setBlogData(response.data.result);
      } catch (error) {
        console.error('Error fetching blog data by month:', error);
      }
    };

    fetchData();
  }, []);

  const getMonth = () => {
   
    return new Date().getMonth() + 1; // Adding 1 because getMonth() returns zero-based month index
  };

  const getYear = () => {
    // Logic to get the year value dynamically
    // For example, you can use Date() to get the current year
    return new Date().getFullYear();
  };

  const months = blogData.map(item => item.month);
  const counts = blogData.map(item => item.count);

  const data = {
    labels: months,
    datasets: [
      {
        label: 'Blog Posts',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: counts,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'category', // Explicitly set scale type to 'category' for the x-axis
      },
    },
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Blog Posts by Month</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BlogByMonthChart;
