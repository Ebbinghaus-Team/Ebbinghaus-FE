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

export type PersonalStudyRoomProblem = {
  problemId: number;
  question: string;
  problemType: ProblemType;
  reviewGate: string;
  createdAt: string;
  lastReviewedAt: string;
  reviewCount: number;
};

export type PersonalStudyRoomDashboard = {
  totalCount: number;
  completedCount: number;
  incompletedCount: number;
  progressRate: number;
};

export type PersonalStudyProblemsResponse = {
  studyRoomId: number;
  studyRoomName: string;
  studyRoomCategory: string;
  studyRoomDescription: string;
  dashboard: PersonalStudyRoomDashboard;
  problems: PersonalStudyRoomProblem[];
  totalCount: number;
};

export type PersonalStudyRoom = {
  studyRoomId: number;
  name: string;
  category: string;
  description: string;
  totalProblems: number;
  graduatedProblems: number;
  createdAt: string;
};

export type PersonalStudyRoomsResponse = {
  rooms: PersonalStudyRoom[];
  totalCount: number;
};

export type GroupStudyRoom = {
  studyRoomId: number;
  name: string;
  category: string;
  description: string;
  joinCode: string;
  totalProblems: number;
  graduatedProblems: number;
  memberCount: number;
  joinedAt: string;
};

export type GroupStudyRoomListResponse = {
  rooms: GroupStudyRoom[];
  totalCount: number;
};

export type JoinGroupStudyRoomBody = {
  joinCode: string;
};

export type JoinGroupStudyRoomResponse = {
  studyRoomId: number;
  name: string;
  category: string;
  description: string;
  joinedAt: string;
};
