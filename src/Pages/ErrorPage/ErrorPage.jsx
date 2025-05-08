import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate

// You can replace this with an actual SVG or a more elaborate illustration
const ErrorIllustration = () => (
    <svg className="w-64 h-64 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9a3 3 0 100-6 3 3 0 000 6zm-7.84 6.62a9.022 9.022 0 0115.68 0M12 14c-2.76 0-5 1.79-5 4h10c0-2.21-2.24-4-5-4z"  className="opacity-50"/> {/* Softer second layer for depth */}
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01" className="text-red-500" /> {/* Sad face elements */}

    </svg>
);
// Or use a ready-made illustration from a library or a URL:
// const errorImageUrl = "https://your-site.com/path-to-error-illustration.svg";


export const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-rose-100 text-gray-800 p-6">
      <div className="text-center bg-white p-8 sm:p-12 rounded-2xl shadow-2xl max-w-lg w-full transform transition-all hover:scale-105 duration-300">
        
        {/* You can use an image/SVG here for better visual appeal */}
        {/* <img src={errorImageUrl} alt="Error Illustration" className="w-48 h-48 mx-auto mb-8" /> */}
        <div className="mb-8">
            <ErrorIllustration />
        </div>

        <h1 className="text-5xl sm:text-6xl font-extrabold text-red-500 mb-4">
          Oops!
        </h1>
        <p className="text-xl sm:text-2xl font-semibold text-gray-700 mb-6">
          Something went wrong.
        </p>
        <p className="text-md text-gray-500 mb-8 leading-relaxed">
          We seem to have hit a snag. Don't worry, it's not you, it's us! <br />
          Our team has been notified, and we're working to get things back on track.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <button
            onClick={() => navigate(-1)} // Go back to the previous page
            className="w-full sm:w-auto px-8 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
          >
            Go Back
          </button>
          <Link
            to="/" // Link to the homepage
            className="w-full sm:w-auto px-8 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
          >
            Go to Homepage
          </Link>
        </div>

        <p className="mt-12 text-xs text-gray-400">
          If the problem persists, please try again later or contact support.
        </p>
      </div>
    </div>
  );
};