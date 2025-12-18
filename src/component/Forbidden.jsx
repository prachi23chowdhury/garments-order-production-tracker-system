import React from 'react';
import { Link } from 'react-router';

export default function Forbidden() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">

        {/* Error Code */}
        <h1 className="text-7xl font-extrabold text-red-500">403</h1>

        {/* Title */}
        <h2 className="mt-4 text-2xl font-bold text-gray-800">
          Access Forbidden
        </h2>

        {/* Message */}
        <p className="mt-3 text-gray-600">
          Sorry, you don’t have permission to access this page.
          <br />
          Please contact admin or wait for approval.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex gap-4 justify-center">
          <Link
            to="/"
            className="px-5 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
          >
            Go Home
          </Link>

          <Link
            to="/login"
            className="px-5 py-2 rounded-lg border border-indigo-600 text-indigo-600 font-semibold hover:bg-indigo-50"
          >
            Login
          </Link>
        </div>

      </div>
    </div>
  );
}
