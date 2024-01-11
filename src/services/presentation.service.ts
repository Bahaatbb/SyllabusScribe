// services
import APIService from '@/services/api.service';
import { API_BASE_URL } from '@/helpers/common.helper';
import { IPresnetationData } from '@/types/app';

export class PresentationService extends APIService {
  constructor() {
    super(API_BASE_URL);
  }

  async getPresentations(): Promise<any> {
    return this.get('/api/presentations/')
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async createPresentation(data: IPresnetationData): Promise<any> {
    return this.post('/api/large-language-model/generate-presentation/', data)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }
}
