import type { ProblemType } from './common';

export type DashboardInfo = {
  totalCount: number;
  completedCount: number;
  incompletedCount: number;
  progressRate: number;
};

export type TodayReviewProblemInfo = {
  problemId: number;
  question: string;
  problemType: ProblemType;
  gate: string;
  nextReviewDate: string;
  attemptStatus: string;
};

export type TodayReviewProblemResponse = {
  dashboard: DashboardInfo;
  problems: TodayReviewProblemInfo[];
};

export type ReviewInclusionBody = {
  includeInReview: boolean;
};

export type ReviewInclusionResponse = {
  includeInReview: boolean;
  message: string;
};

export type ReviewInclusionVariables = {
  problemId: number;
  reviewInclusionBody: ReviewInclusionBody;
};
