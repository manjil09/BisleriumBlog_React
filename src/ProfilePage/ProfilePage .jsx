import React from 'react';

const ProfilePage = () => {
  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl mb-4">Profile</h2>
      <div className="bg-white shadow-md rounded-md p-6">
        <div className="flex items-center mb-4">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="rounded-full h-24 w-24 mr-4"
          />
          <div>
            <h3 className="text-xl font-bold">John Doe</h3>
            <p className="text-gray-600">Web Developer</p>
          </div>
        </div>
        <div className="mb-4">
          <h4 className="text-lg font-bold mb-2">About Me</h4>
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            tristique dui sit amet nunc tempus, ac egestas mauris
            pellentesque.
          </p>
        </div>
        <div className="mb-4">
          <h4 className="text-lg font-bold mb-2">Contact Information</h4>
          <p className="text-gray-700">
            Email: john.doe@example.com
            <br />
            Phone: +1 234 567 890
          </p>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-2">Social Media</h4>
          <div className="flex items-center">
            <a
              href="https://twitter.com/johndoe"
              className="mr-4 text-blue-500 hover:text-blue-700"
            >
              Twitter
            </a>
            <a
              href="https://linkedin.com/in/johndoe"
              className="mr-4 text-blue-500 hover:text-blue-700"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/johndoe"
              className="text-blue-500 hover:text-blue-700"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
