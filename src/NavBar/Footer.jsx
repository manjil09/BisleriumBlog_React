import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">Bislerium Company</h2>

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
              <li className="mb-1"><a href="https://github.com/manjil09/BisleriumBlog_React" className="hover:text-white">GitHub</a></li>
              <li className="mb-1"><a href="https://github.com/manjil09/BisleriumBlog" className="hover:text-white">GitHub Backend</a></li>
              <li className="mb-1"><a href="http://localhost:3000/" className="hover:text-white">Bislerium compny</a></li>
              <li className="mb-1"><a href="#" className="hover:text-white">Twitter</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
