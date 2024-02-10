// services
import APIService from '@/services/api.service';
import { API_BASE_URL } from '@/helpers/common.helper';
import { IPresnetationData } from '@/types/app';

export class UnitService extends APIService {
  constructor() {
    super(API_BASE_URL);
  }

  async getUnits(): Promise<any> {
    return this.get('/api/user/lesson-units')
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async deleteUnit(id: string): Promise<any> {
    return this.delete(`/api/unit/${id}`)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }
  async createUnit(data: IPresnetationData): Promise<any> {
    return this.post('/api/large-language-model/generate-unit/', data)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }
}
