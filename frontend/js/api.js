const API_BASE_URL = 'http://localhost:5000/api';

const api = {
  async request(endpoint, options = {}) {
    const headers = { 'Content-Type': 'application/json', ...options.headers };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Erro na requisição');
    return data;
  },

  // Sprint 1: só a verificação de texto está disponível.
  checkText: (text) => api.request('/check/text', { method: 'POST', body: JSON.stringify({ text }) })
};
