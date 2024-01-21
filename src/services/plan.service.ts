// services
import APIService from '@/services/api.service';
import { API_BASE_URL } from '@/helpers/common.helper';
import { IPresnetationData } from '@/types/app';

export class PlanService extends APIService {
  constructor() {
    super(API_BASE_URL);
  }

  async getPlans(): Promise<any> {
    return this.get('/api/user/lesson-plans')
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async createPlan(data: IPresnetationData): Promise<any> {
    return this.post('/api/large-language-model/generate-Plan/', data)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }
}
