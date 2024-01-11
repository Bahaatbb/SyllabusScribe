// axios
import { isTokenExpired } from '@/helpers/common.helper';
import { notifications } from '@mantine/notifications';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
// js cookie
import Cookies from 'js-cookie';

abstract class APIService {
  protected baseURL: string;
  protected headers: any = {};
  private axiosInstance: AxiosInstance = axios.create();

  constructor(_baseURL: string) {
    this.baseURL = _baseURL;
    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const accessToken = this.getAccessToken();
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // If the error status is 401 and there is no originalRequest._retry flag,
        // it means the token has expired and we need to refresh it
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = this.getRefreshToken();
            if (!refreshToken || isTokenExpired(refreshToken)) {
              notifications.show({
                title: 'Error',
                message: 'Your session has expired. Please log in again.',
                color: 'red',
              });

              window.location.href = '/login';
              return Promise.reject(error);
            }

            const refreshResponse = await this.axiosInstance.post(
              'http://localhost:8000/api/auth/login/refresh',
              {
                refresh: refreshToken,
              }
            );

            const newAccessToken = refreshResponse.data.access;
            const newRefreshToken = refreshResponse.data.refresh;

            this.setAccessToken(newAccessToken);
            this.setRefreshToken(newRefreshToken);

            return this.axiosInstance(originalRequest);
          } catch (refreshError) {
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  setRefreshToken(token: string) {
    Cookies.set('refreshToken', token);
  }

  getRefreshToken() {
    return Cookies.get('refreshToken');
  }

  purgeRefreshToken() {
    Cookies.remove('refreshToken', { path: '/' });
  }

  setAccessToken(token: string) {
    Cookies.set('accessToken', token);
  }

  getAccessToken() {
    return Cookies.get('accessToken');
  }

  purgeAccessToken() {
    Cookies.remove('accessToken', { path: '/' });
  }

  getHeaders() {
    return {
      Authorization: `Bearer ${this.getAccessToken()}`,
    };
  }

  get(url: string, config = {}): Promise<any> {
    return this.axiosInstance({
      method: 'get',
      url: this.baseURL + url,
      ...config,
    });
  }

  post(url: string, data = {}, config = {}): Promise<any> {
    return this.axiosInstance({
      method: 'post',
      url: this.baseURL + url,
      data,
      headers: this.getAccessToken() ? this.getHeaders() : {},
      ...config,
    });
  }

  put(url: string, data = {}, config = {}): Promise<any> {
    return this.axiosInstance({
      method: 'put',
      url: this.baseURL + url,
      data,
      headers: this.getAccessToken() ? this.getHeaders() : {},
      ...config,
    });
  }

  patch(url: string, data = {}, config = {}): Promise<any> {
    return this.axiosInstance({
      method: 'patch',
      url: this.baseURL + url,
      data,
      headers: this.getAccessToken() ? this.getHeaders() : {},
      ...config,
    });
  }

  delete(url: string, data?: any, config = {}): Promise<any> {
    return this.axiosInstance({
      method: 'delete',
      url: this.baseURL + url,
      data: data,
      headers: this.getAccessToken() ? this.getHeaders() : {},
      ...config,
    });
  }

  mediaUpload(url: string, data = {}, config = {}): Promise<any> {
    return this.axiosInstance({
      method: 'post',
      url: this.baseURL + url,
      data,
      headers: this.getAccessToken()
        ? { ...this.getHeaders(), 'Content-Type': 'multipart/form-data' }
        : {},
      ...config,
    });
  }

  request(config: AxiosRequestConfig = {}) {
    return axios(config);
  }
}

export default APIService;
