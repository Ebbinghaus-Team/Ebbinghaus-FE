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

export type GroupStudyRoomsResponse = {
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

export type GroupStudyRoomDashboard = {
  totalCount: number;
  reviewingCount: number;
  unreviewedCount: number;
};

export type GroupStudyRoomProblem = {
  problemId: number;
  question: string;
  problemType: ProblemType;
  reviewGate: string;
  createdAt: string;
  lastReviewedAt: string | null;
  reviewCount: number;
  isMyProblem: boolean;
  creatorName: string;
};
export interface GroupStudyRoomProblemsResponse {
  studyRoomId: number;
  studyRoomName: string;
  studyRoomCategory: string;
  studyRoomDescription: string;
  joinCode: string;
  dashboard: GroupStudyRoomDashboard;
  problems: GroupStudyRoomProblem[];
  totalCount: number;
}

export type GroupStudyRoomMember = {
  userId: number;
  username: string;
  isOwner: boolean;
};

export type GroupStudyRoomMembersResponse = {
  studyRoomId: number;
  studyRoomName: string;
  totalMembers: number;
  members: GroupStudyRoomMember[];
};
