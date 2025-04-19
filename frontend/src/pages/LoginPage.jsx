import React from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
    <div className="max-w-md w-full bg-gray-800 p-8 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">Вхід</h2>
      <LoginForm />
    </div>
  </div>
);

export default LoginPage;
