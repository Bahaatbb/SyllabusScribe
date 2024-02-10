// services
import APIService from '@/services/api.service';
import { API_BASE_URL } from '@/helpers/common.helper';
import { IPresnetationData } from '@/types/app';

export class ContextService extends APIService {
  constructor() {
    super(API_BASE_URL);
  }

  async getContexts(): Promise<any> {
    return this.get('/api/user/lesson-contexts')
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async getOneContext(id: string): Promise<any> {
    return this.get(`/api/lesson-context/${id}`)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async deleteContext(id: string): Promise<any> {
    return this.get(`/api/context/${id}`)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }
  async createContext(data: IPresnetationData): Promise<any> {
    return this.post('/api/large-language-model/generate-context/', data)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }
}
