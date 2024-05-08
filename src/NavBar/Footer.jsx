import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">Your Company Name</h2>
            <p className="text-sm">A short description about your company.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-2">
              <li className="mb-1"><a href="/" className="hover:text-white">Home</a></li>
              <li className="mb-1"><a href="MyBlog" className="hover:text-white">My Blog </a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <ul className="mt-2">
              <li className="mb-1"><a href="#" className="hover:text-white">Facebook</a></li>
              <li className="mb-1"><a href="#" className="hover:text-white">Twitter</a></li>
              <li className="mb-1"><a href="#" className="hover:text-white">Instagram</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
