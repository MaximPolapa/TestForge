import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RepositoryDetails = () => {
  const { id } = useParams();
  const [repo, setRepo] = useState(null);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');
  const [generating, setGenerating] = useState(false);
  const [generationResult, setGenerationResult] = useState('');

  useEffect(() => {
    const fetchRepoDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/repositories/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRepo(res.data);

        const match = res.data.github_url.match(/github\.com\/([^/]+)\/([^/]+)/);
        if (match) {
          const [, owner, repoName] = match;
          const ghRes = await fetch(`https://api.github.com/repos/${owner}/${repoName}/contents`);
          const ghData = await ghRes.json();
          setFiles(ghData);
        }
      } catch (err) {
        console.error(err);
        setError('❌ Не вдалося завантажити репозиторій');
      }
    };

    fetchRepoDetails();
  }, [id]);

  const generateTests = async () => {
    setGenerating(true);
    setGenerationResult('');
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/repositories/${id}/generate-tests`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setGenerationResult(response.data.message || '✅ Тести згенеровано успішно!');
    } catch (err) {
      console.error(err);
      setGenerationResult("❌ Виникла помилка при генерації тестів.");
    } finally {
      setGenerating(false);
    }
  };

  if (error) return <div className="p-6 text-red-400">{error}</div>;
  if (!repo) return <div className="p-6 text-white">Завантаження...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-4">{repo.name}</h1>
      <p className="mb-4">
        🔗 <a href={repo.github_url} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
          {repo.github_url}
        </a>
      </p>

      <h2 className="text-2xl font-semibold mb-2">📁 Файли:</h2>
      <ul className="list-disc list-inside space-y-1 mb-6">
        {files.length > 0 ? files.map(file => (
          <li key={file.sha}>
            {file.type === 'file' ? (
              <a href={file.html_url} target="_blank" rel="noopener noreferrer" className="text-green-300 underline">
                📄 {file.name}
              </a>
            ) : (
              <span className="text-yellow-300">📁 {file.name}</span>
            )}
          </li>
        )) : <p>Порожньо або не вдалося завантажити вміст.</p>}
      </ul>

      <button
        onClick={generateTests}
        disabled={generating}
        className={`px-6 py-2 font-bold rounded-xl transition ${
          generating ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {generating ? '⏳ Генерація...' : '🚀 Згенерувати Unit-тести'}
      </button>

      {generationResult && <p className="mt-4 text-green-400">{generationResult}</p>}
    </div>
  );
};

export default RepositoryDetails;
