// services
import APIService from '@/services/api.service';
import { API_BASE_URL } from '@/helpers/common.helper';
import { ILoginTokenResponse } from '@/types/auth';

export class AuthService extends APIService {
  constructor() {
    super(API_BASE_URL);
  }

  async Login(data: { username: string; password: string }): Promise<ILoginTokenResponse> {
    return this.post('/api/auth/login/', data, { headers: {} })
      .then((response) => {
        this.setAccessToken(response?.data?.access);
        this.setRefreshToken(response?.data?.refresh);
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async emailSignUp(data: { email: string; password: string }) {
    return this.post('/api/auth/login', data, { headers: {} })
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async signOut() {
    return this.post('/api/sign-out/', { refresh_token: this.getRefreshToken() })
      .then((response) => {
        this.purgeAccessToken();
        this.purgeRefreshToken();
        return response?.data;
      })
      .catch((error) => {
        this.purgeAccessToken();
        this.purgeRefreshToken();
        throw error?.response?.data;
      });
  }

  async refreshToken() {
    return this.post('/api/token/refresh/', { refresh: this.getRefreshToken() })
      .then((response) => {
        this.setAccessToken(response?.data?.access);
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }
}
