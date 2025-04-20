// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import MyProjects from './pages/MyProjects';
import SettingsPage from './pages/SettingsPage'; 
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import React from 'react';

function App() {
  return (
    <Router>
      <Navbar /> {/* 👈 Один раз для всіх сторінок */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/my-projects" element={<PrivateRoute><MyProjects /></PrivateRoute>} />
        <Route path="/settings" element={<PrivateRoute><SettingsPage /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}


export default App;
