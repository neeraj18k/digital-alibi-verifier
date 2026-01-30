import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});


// Request interceptor to add JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API functions
export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response;
};

export const signup = async (name, email, password, confirmPassword) => {
  const response = await api.post('/auth/signup', { name, email, password, confirmPassword });
  return response;
};

// Case API functions
export const createCase = async (caseData) => {
  const response = await api.post('/cases/create', caseData);
  return response;
};

// Upload single JSON event file
export const uploadEvents = async (caseId, file, type) => {
  const formData = new FormData();

  formData.append("file", file);     // JSON file
  formData.append("caseId", caseId); // Case ID
  formData.append("type", type);     // app / location / network

  return api.post("/cases/events/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};


export const getTimeline = async (caseId) => {
  const response = await api.get(`/cases/${caseId}/timeline`);
  return response;
};

export const getVerdict = async (caseId) => {
  const response = await api.get(`/cases/${caseId}/verdict`);
  return response;
};

export const sendEmailReport = async (caseId) => {
  const response = await api.post(`/cases/${caseId}/email`);
  return response;
};

// Additional utility functions
export const getCase = async (caseId) => {
  const response = await api.get(`/cases/${caseId}`);
  return response;
};

export default api;

