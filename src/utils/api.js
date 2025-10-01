// User profile data API endpoint
// src/utils/api.js
const API_BASE_URL = import.meta.env.VITE_BASE_API_URL || 'http://127.0.0.1:8000/api/v1';
export const USER_PROFILE_API = `${API_BASE_URL}/view-profile/`;
export const USER_ALL_POSTS_API = `${API_BASE_URL}/view-all-posts/`;


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

  // Only add Authorization header if not logging in and token exists
  const token = localStorage.getItem('authToken');
  if (token && endpoint !== '/login/') {
    config.headers.Authorization = `Token ${token}`;
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
