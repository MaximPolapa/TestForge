import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MyProjects = () => {
  const [repositories, setRepositories] = useState([]);
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const fetchRepositories = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/repositories/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRepositories(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addRepository = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${import.meta.env.VITE_API_URL}/repositories/`, {
        name,
        github_url: url
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('✅ Репозиторій додано');
      setName('');
      setUrl('');
      fetchRepositories();
    } catch (err) {
      console.error(err);
      setMessage('❌ Помилка додавання репозиторію');
    }
  };

  const goToRepo = (id) => {
    navigate(`/repo/${id}`);
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  return (
    <div className="p-8 min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">📁 Мої репозиторії</h1>

      <form onSubmit={addRepository} className="bg-gray-800 p-6 rounded-xl mb-10">
        <div className="mb-4">
          <label className="block mb-1">Назва репозиторію</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">GitHub URL</label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded text-white font-bold">
          ➕ Додати
        </button>
        {message && <p className="mt-4 text-sm text-green-400">{message}</p>}
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {repositories.map((repo) => (
          <div key={repo.id} className="bg-gray-800 p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold">{repo.name}</h2>
            <p className="text-sm text-gray-400 mb-2 break-all">{repo.github_url}</p>
            <button
              onClick={() => goToRepo(repo.id)}
              className="mt-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
            >
              🔍 Переглянути
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProjects;
