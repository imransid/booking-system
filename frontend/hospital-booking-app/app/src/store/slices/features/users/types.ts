// This type will represent the sub-state for getting a single user by ID
export interface IUserState {
  data: any | null;
  isLoading: boolean;
  errors: string;
  loginStatus: boolean;
}

// The users global state
export interface UsersStateType {
  user: any;
  loader: boolean;
}

export interface ILogInPayload {
  email: string;
  password: string;
}
