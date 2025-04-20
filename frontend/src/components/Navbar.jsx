// src/components/Navbar.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData && userData.username) {
      setUsername(userData.username);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex justify-between items-center shadow-md">
      <div className="flex items-center space-x-6">
        <span className="text-xl font-bold text-white">GenAI Unit Test Generator</span>
        <Link to="/" className="hover:text-blue-400">Home</Link>
        <Link to="/my-projects" className="hover:text-blue-400">My Projects</Link>
        <Link to="/settings" className="hover:text-blue-400">Settings</Link>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-blue-300">👤 {username || '...'}</span>
        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded text-white font-bold"
        >
          Вийти
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
