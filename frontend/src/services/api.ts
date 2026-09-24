// Simple centralized API client
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

async function fetchApi(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('kaal_auth_token');
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorMessage = 'An unexpected error occurred.';
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch (e) {
      // Not JSON or empty body
      if (response.status === 503) {
        errorMessage = "KAAL AI is temporarily unavailable. Please try again.";
      } else if (response.status === 401) {
        errorMessage = "Your session has expired. Please log in again.";
      }
    }
    throw new Error(errorMessage);
  }

  return response.json();
}

export const authApi = {
  login: (data: any) => fetchApi('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  register: (data: any) => fetchApi('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  me: () => fetchApi('/auth/me', { method: 'GET' }),
};

export const guidanceApi = {
  ask: (data: any) => fetchApi('/guidance', { method: 'POST', body: JSON.stringify(data) }),
  list: () => fetchApi('/guidance', { method: 'GET' }),
  get: (id: string) => fetchApi(`/guidance/${id}`, { method: 'GET' }),
  delete: (id: string) => fetchApi(`/guidance/${id}`, { method: 'DELETE' }),
};
