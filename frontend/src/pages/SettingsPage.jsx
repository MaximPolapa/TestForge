// src/pages/SettingsPage.jsx
import React from 'react';

const SettingsPage = () => {
  const username = JSON.parse(localStorage.getItem('user'))?.username;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">⚙️ Налаштування</h1>
      <p className="text-lg mb-4">Ім'я користувача: <span className="font-semibold text-blue-400">{username}</span></p>

      <div className="bg-gray-800 p-6 rounded-xl shadow-xl">
        <h2 className="text-2xl font-semibold mb-4">Ваш профіль</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Змінити email (в майбутньому)</li>
          <li>Змінити пароль (в майбутньому)</li>
          <li>GitHub інтеграція (в майбутньому)</li>
        </ul>
      </div>
    </div>
  );
};

export default SettingsPage;
