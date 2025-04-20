import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const formData = new URLSearchParams();
      formData.append("username", email);
      formData.append("password", password);
  
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        formData,
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );
  
      const { access_token, username } = response.data;
  
      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify({ username })); // 👈 Зберігаємо ім’я користувача
      navigate('/my-projects');
    } catch (error) {
      console.error(error);
      setMessage('❌ Невірний email або пароль');
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
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
        Увійти
      </button>
      {message && <p className="mt-4 text-center text-red-400">{message}</p>}
    </form>
  );
};




export default LoginForm;
