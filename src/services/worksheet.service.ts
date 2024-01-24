// services
import APIService from '@/services/api.service';
import { API_BASE_URL } from '@/helpers/common.helper';
import { IPresnetationData } from '@/types/app';

export class WorksheetsService extends APIService {
  constructor() {
    super(API_BASE_URL);
  }

  async getWorksheets(): Promise<any> {
    return this.get('/api/user/lesson-handouts')
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async getOneWorksheet(id: string): Promise<any> {
    return this.get(`/api/lesson-handout/${id}`)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async createWorksheet(data: IPresnetationData): Promise<any> {
    return this.post('/api/large-language-model/generate-handouts/', data)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }
}
