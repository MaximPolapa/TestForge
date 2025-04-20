import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import MyProjects from './pages/MyProjects';
import PrivateRoute from './components/PrivateRoute'; // 👈 Імпорт захищеного маршруту
import React from 'react';

<Route path="/" element={<HomePage />} /> 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Захищений маршрут */}
        <Route path="/my-projects" element={
          <PrivateRoute>
            <MyProjects />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
