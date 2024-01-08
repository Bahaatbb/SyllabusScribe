import axios from 'axios';
import { AuthService } from '@/services/auth.service';
import Cookies from 'js-cookie';

const instance = axios.create();

// Add a response interceptor
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // get from cookies
        const refreshToken = Cookies.get('refreshToken');
        if (!refreshToken) {
          return Promise.reject(error);
        }
        const response = await axios.post('/api/refresh-token', { refreshToken });
        const { token } = response.data;

        localStorage.setItem('token', token);

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axios(originalRequest);
      } catch (error) {
        // redirect to login page
        location.href = '/login';
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
