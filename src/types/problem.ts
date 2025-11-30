import type { ProblemType } from './common';

type BaseProblemBody = {
  question: string;
  explanation: string;
};

export type MCQProblemBody = BaseProblemBody & {
  problemType: 'MCQ';
  choices: string[];
  correctChoiceIndex: number;
};

export type OXProblemBody = BaseProblemBody & {
  problemType: 'OX';
  answerBoolean: boolean;
};

export type SHORTProblemBody = BaseProblemBody & {
  problemType: 'SHORT';
  answerText: string;
};

export type SUBJECTIVEProblemBody = BaseProblemBody & {
  problemType: 'SUBJECTIVE';
  modelAnswerText: string;
  keywords: string[];
};

export type CreateProblemBody =
  | MCQProblemBody
  | OXProblemBody
  | SHORTProblemBody
  | SUBJECTIVEProblemBody;

export type CreateProblemVariables = {
  studyRoomId: number;
  createProblemBody: CreateProblemBody;
};

export type CreateProblemResponse = {
  problemId: number;
  studyRoomId: number;
  problemType: ProblemType;
  question: string;
  createdAt: string;
};

export type SubmitProblemBody = {
  answer: string;
};

export type SubmitProblemVariables = {
  problemId: number;
  submitProblemBody: SubmitProblemBody;
};

export type SubmitProblemResponse = {
  isCorrect: boolean;
  explanation: string;
  aiFeedback: string | null;
  currentGate: 'GATE_1' | 'GATE_2' | 'GRADUATED' | null;
  reviewCount: number | null;
  nextReviewDate: string | null;
  isFirstAttempt: boolean;
  isReviewStateChanged: boolean;
};

export type ProblemDetailResponse = {
  problemId: number;
  question: string;
  problemType: ProblemType;
  studyRoomId: number;
  choices?: string[]; // MCQ만 포함
  currentGate: 'GATE_1' | 'GATE_2' | 'GRADUATED' | 'NOT_IN_REVIEW' | null;
  nextReviewDate: string | null;
  reviewCount: number | null;
  includeInReview: boolean | null;
};
