export type ApiError = {
  status: number;
  title: string;
  detail: string;
  instance: string;
};

export type ProblemType = 'MCQ' | 'OX' | 'SHORT' | 'SUBJECTIVE';
