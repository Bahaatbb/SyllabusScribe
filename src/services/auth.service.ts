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

  async Register(data: any) {
    console.log(data)
    return this.post('/api/auth/signup/', data, { headers: {} })
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async signOut() {
    this.purgeAccessToken();
    this.purgeRefreshToken();
    window.location.href = '/login';
  }

  async refreshToken() {
    return this.post('/api/token/refresh/', { refresh: this.getRefreshToken() })
      .then((response) => {
        this.setAccessToken(response?.data?.access);
        //@ts-ignore
        this.refreshToken(response?.data?.refresh);
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }
}
