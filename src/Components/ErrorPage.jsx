import React from 'react';
import { Link } from 'react-router';

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center  px-5">
      <h1 className="text-9xl font-extrabold text-[#f47000] mb-6">404</h1>
      <h2 className="text-3xl md:text-4xl font-bold text-[#096B68] mb-4 text-center">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-700 mb-8 text-center max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-[#096B68] hover:bg-[#129990] text-white rounded-xl font-semibold transition duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
