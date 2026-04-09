import React from 'react';

/**
 * Loader Component - Spinning loader for async operations
 */
const Loader = ({ size = 'md', message = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className={`${sizeClasses[size]} animate-spin`}>
        <div className="w-full h-full border-4 border-blue-200 border-t-blue-600 rounded-full"></div>
      </div>
      {message && <p className="text-gray-600 font-medium">{message}</p>}
    </div>
  );
};

export default Loader;
