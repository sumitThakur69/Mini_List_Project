import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px] py-12">
      <div className="text-center">
        {/* Spinning Circle Loader */}
        <div className="inline-block">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
        
        {/* Loading Text */}
        <p className="mt-4 text-gray-600 text-lg font-medium">
          Loading products...
        </p>
        <p className="mt-2 text-gray-500 text-sm">
          Please wait a moment
        </p>
      </div>
    </div>
  );
};

export default Loader;