export interface IPresnetationData {
  num_slides: number;
  topic: string;
  grade_level: string;
}

export interface IQuizData {
  topic: string;
  grade_level: string;
}

export interface IPresentationResponse {
  model_output: string;
}

export interface ISPMData {
  hours_studied: number;
  previous_score: number;
  extracurricular_activities: number;
  sleep_hours: number;
  sample_question_papers_practiced: number;
};
