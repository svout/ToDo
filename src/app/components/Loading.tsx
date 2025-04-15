import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="flex flex-col items-center">
        <ClipLoader color="#3b82f6" size={50} />
        <p className="mt-4 text-gray-600">Loading your todos...</p>
      </div>
    </div>
  );
};

export default Loading;
