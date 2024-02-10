// services
import APIService from '@/services/api.service';
import { API_BASE_URL } from '@/helpers/common.helper';

export class SubjectService extends APIService {
  constructor() {
    super(API_BASE_URL);
  }

  async getSubjects(): Promise<any> {
    return this.get('/api/user/subjects')
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async getOneSubject(id: string): Promise<any> {
    return this.get(`/api/subject/${id}`)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async deleteSubject(id: string): Promise<any> {
    return this.delete(`/api/subject/${id}`)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async createSubject(data: any): Promise<any> {
    return this.post('/api/create/subject', data)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }
  async createUnit(data: any): Promise<any> {
    return this.post('/api/create/unit', data)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }
}
