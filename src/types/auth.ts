export type SignupBody = {
  email: string;
  password: string;
  username: string;
  receiveNotifications: boolean;
};

export type SignupResponse = {
  userId: number;
  email: string;
  username: string;
  receiveNotifications: boolean;
};

export type LoginBody = {
  email: string;
  password: string;
};

export type LoginResponse = {
  userId: number;
  email: string;
  username: string;
};
