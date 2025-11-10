import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const complaintApi = {
  createComplaint: (title, description) => api.post('/complaints', { title, description }),
  getMyComplaints: () => api.get('/complaints/my'),
};

export { complaintApi };
export default api;
