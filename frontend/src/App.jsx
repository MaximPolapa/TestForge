import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage'; 
import React from 'react';
import HomePage from './pages/HomePage'; 

<Route path="/" element={<HomePage />} /> 


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} /> {/* 👈 */}
      </Routes>
    </Router>
  );
}

export default App;
