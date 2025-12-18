import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      
      {/* Spinner */}
      <div className="w-14 h-14 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>

      {/* Text */}
      <p className="mt-4 text-gray-600 text-sm">
        Loading, please wait...
      </p>

    </div>
  );
}
