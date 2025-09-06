// src/utils/api.js
const API_BASE_URL = 'https://phi-book-phi.vercel.app/api/v1';

// Generic API call function
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Add auth token if available
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.error || `HTTP error! status: ${response.status}`);
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Auth API calls
export const authAPI = {
  // Register user
  register: async (userData) => {
    return await apiCall('/register/', {
      method: 'POST',
      body: JSON.stringify({
        name: userData.name.trim(),
        email: userData.email.trim(),
        password: userData.password,
        confirm_password: userData.confirm,
      }),
    });
  },

  // Login user
  login: async (credentials) => {
    return await apiCall('/login/', {
      method: 'POST',
      body: JSON.stringify({
        email: credentials.email.trim(),
        password: credentials.password,
      }),
    });
  },

  // Logout user (if your API supports it)
  logout: async () => {
    return await apiCall('/logout/', {
      method: 'POST',
    });
  },

  // Get current user profile
  getProfile: async () => {
    return await apiCall('/profile/');
  },
};

// Posts API calls (for future use)
export const postsAPI = {
  // Get all posts
  getPosts: async () => {
    return await apiCall('/posts/');
  },

  // Create new post
  createPost: async (postData) => {
    return await apiCall('/posts/', {
      method: 'POST',
      body: JSON.stringify(postData),
    });
  },

  // Update post
  updatePost: async (postId, postData) => {
    return await apiCall(`/posts/${postId}/`, {
      method: 'PUT',
      body: JSON.stringify(postData),
    });
  },

  // Delete post
  deletePost: async (postId) => {
    return await apiCall(`/posts/${postId}/`, {
      method: 'DELETE',
    });
  },
};

export default { authAPI, postsAPI };
