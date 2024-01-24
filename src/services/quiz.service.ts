// services
import APIService from '@/services/api.service';
import { API_BASE_URL } from '@/helpers/common.helper';
import { IQuizData } from '@/types/app';

export class QuizService extends APIService {
  constructor() {
    super(API_BASE_URL);
  }

  async getQuizzes(): Promise<any> {
    return this.get('/api/user/lesson-quizzes')
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async getOneQuiz(id: string): Promise<any> {
    return this.get(`/api/lesson-quiz/${id}`)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async createQuiz(data: IQuizData): Promise<any> {
    return this.post('/api/large-language-model/generate-quiz/', data)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }
}
