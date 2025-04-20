import React from 'react';

const HomePage = () => {
  const username = localStorage.getItem('username');

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <h2 className="text-4xl font-semibold">👋 Привіт, {username}!</h2>
    </div>
  );
};

export default HomePage;
