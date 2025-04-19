import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // для редіректу після реєстрації

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState(''); // <=== додано
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/users/register`, {
        email,
        username, // <=== додано
        password
      });
      setMessage('✅ Реєстрація успішна!');
      setTimeout(() => navigate('/login'), 1000); // редірект після 1 секунди
    } catch (error) {
      setMessage('❌ Помилка при реєстрації!');
      console.error(error.response?.data);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="max-w-md w-full bg-gray-800 p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Реєстрація</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-2 bg-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Ім’я користувача</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full px-4 py-2 bg-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 bg-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition"
          >
            Зареєструватися
          </button>
        </form>
        {message && <p className="mt-4 text-center text-white">{message}</p>}
      </div>
    </div>
  );
};

export default RegisterForm;
