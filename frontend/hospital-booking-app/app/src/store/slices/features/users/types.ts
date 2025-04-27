import { number } from "yup";

// This type will represent the sub-state for getting a single user by ID
export interface IUserState {
  data: IUser | null;
}

export interface IUser {
  id: number;
  name: string;
  token: string;
}

// The users global state
export interface UsersStateType {
  user: IUserState;
  loader: boolean;
}

export interface ILogInPayload {
  email: string;
  password: string;
}
