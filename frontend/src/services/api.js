import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true,
});

// Auth is carried entirely by the httpOnly cookie the backend sets on
// login (see authController.sendTokenResponse). We deliberately do NOT
// also keep the JWT in localStorage/JS-accessible state: that would let
// any injected script (XSS) read and exfiltrate it, which defeats the
// purpose of an httpOnly cookie in the first place.

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 && !err.config.url.includes('/auth/login')) {
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(err);
  }
);

export default api;
