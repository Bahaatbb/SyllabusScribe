// services
import APIService from '@/services/api.service';
import { API_BASE_URL } from '@/helpers/common.helper';
import { ISPMData } from '@/types/app';

export class SPMService extends APIService {
  constructor() {
    super(API_BASE_URL);
  }

  async getSPM(data: ISPMData): Promise<{
    model_output: {
      performance_index: number;
    };
  }> {
    return this.post('/api/student-performance-model/query/', data)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }
}
