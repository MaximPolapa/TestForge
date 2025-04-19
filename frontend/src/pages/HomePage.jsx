import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData && userData.username) {
      setUsername(userData.username);
    } else {
      navigate('/login');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <div className="flex justify-between items-center p-6 bg-gray-800 shadow">
        <h1 className="text-2xl font-bold">GenAI Unit Test Generator</h1>
        <div className="flex items-center gap-4">
          <span className="text-lg">👤 {username}</span>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl transition"
          >
            Вийти
          </button>
        </div>
      </div>
      <div className="flex-grow flex items-center justify-center">
        <h2 className="text-4xl font-semibold">👋 Привіт, {username}!</h2>
      </div>
    </div>
  );
};

export default HomePage;
