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

export type SubmitProblemResponse = {
  isCorrect: boolean;
  explanation: string;
  aiFeedback: string;
  currentGate: string;
  reviewCount: number;
  nextReviewDate: string;
  isFirstAttempt: boolean;
  isReviewStateChanged: boolean;
};
