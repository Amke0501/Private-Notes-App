const API_URL = 'https://private-notes-app.onrender.com/api';

// Helper to get auth token
const getAuthToken = () => {
  return localStorage.getItem('access_token');
};

// Helper to get headers with auth
const getAuthHeaders = () => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

/**
 * Authentication API calls
 */
export const authAPI = {
  signup: async (email, password) => {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Signup failed');
    }
    
    return data;
  },

  login: async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Login failed');
    }
    
    // Store token in localStorage
    if (data.token) {
      localStorage.setItem('access_token', data.token);
    }
    
    return data;
  },

  logout: async () => {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      headers: getAuthHeaders(),
      credentials: 'include',
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Logout failed');
    }
    
    // Remove token from localStorage
    localStorage.removeItem('access_token');
    
    return data;
  },

  getCurrentUser: async () => {
    const response = await fetch(`${API_URL}/auth/me`, {
      headers: getAuthHeaders(),
      credentials: 'include',
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to get user');
    }
    
    return data;
  },
};

/**
 * Notes API calls
 */
export const notesAPI = {
  getNotes: async () => {
    const response = await fetch(`${API_URL}/notes`, {
      headers: getAuthHeaders(),
      credentials: 'include',
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch notes');
    }
    
    return data;
  },

  createNote: async (title, content) => {
    const response = await fetch(`${API_URL}/notes`, {
      method: 'POST',
      headers: getAuthHeaders(),
      credentials: 'include',
      body: JSON.stringify({ title, content }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to create note');
    }
    
    return data;
  },

  updateNote: async (id, title, content) => {
    const response = await fetch(`${API_URL}/notes/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      credentials: 'include',
      body: JSON.stringify({ title, content }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to update note');
    }
    
    return data;
  },

  deleteNote: async (id) => {
    const response = await fetch(`${API_URL}/notes/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
      credentials: 'include',
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to delete note');
    }
    
    return data;
  },
};
