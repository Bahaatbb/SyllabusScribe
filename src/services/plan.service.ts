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

  async getOnePlan(id: string): Promise<any> {
    return this.get(`/api/lesson-plan/${id}`)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async deletePlan(id: string): Promise<any> {
    return this.delete(`/api/lesson-plan/${id}`)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async createPlan(data: Omit<IPresnetationData, 'num_slides'>): Promise<any> {
    return this.post('/api/large-language-model/generate-lesson-plan/', data)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }
}
