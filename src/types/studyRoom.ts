import type { ProblemType } from './common';

export type CreatePersonalStudyRoomBody = {
  name: string;
  description: string;
  category: string;
};

export type CreatePersonalStudyRoomResponse = {
  studyRoomId: number;
  name: string;
  category: string;
  description: string;
  createdAt: string;
};

export type CreateGroupStudyRoomBody = {
  name: string;
  description: string;
  category: string;
};

export type CreateGroupStudyRoomResponse = {
  studyRoomId: number;
  name: string;
  category: string;
  description: string;
  joinCode: string;
  createdAt: string;
};

export type ProblemSummary = {
  problemId: number;
  question: string;
  problemType: ProblemType;
  reviewGate: string;
  createdAt: string;
  lastReviewedAt: string;
  reviewCount: number;
};

export type PersonalStudyProblemsResponse = {
  studyRoomId: number;
  studyRoomName: string;
  problems: ProblemSummary[];
  totalCount: number;
};
