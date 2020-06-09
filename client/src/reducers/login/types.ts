export const LOGOUT_ACTION = 'LOGOUT_ACTION';
export const GET_USER_PROFILE = 'GET_USER_PROFILE';
export const GET_USER_PROFILE_SUCCESS = 'GET_USER_PROFILE_SUCCESS';
export const GET_USER_PROFILE_FAILURE = 'GET_USER_PROFILE_FAILURE';

export type LOGOUT_ACTION = typeof LOGOUT_ACTION;
export type GET_USER_PROFILE = typeof GET_USER_PROFILE;
export type GET_USER_PROFILE_SUCCESS = typeof GET_USER_PROFILE_SUCCESS;
export type GET_USER_PROFILE_FAILURE = typeof GET_USER_PROFILE_FAILURE;

export interface LoginStartedPayload {
  email: string;
  password: string;
}

export interface Logout {
  type: LOGOUT_ACTION;
}

export interface GetUserProfile {
  type: GET_USER_PROFILE;
}

export interface GetUserProfileSucess {
  type: GET_USER_PROFILE_SUCCESS;
  payload: UserProfile;
}

export interface GetUserProfileFailure {
  type: GET_USER_PROFILE_FAILURE;
  error: Error;
}

export interface UserProfile {
  role: string;
}
// Union type
export type AccountActions =
  | Logout
  | GetUserProfile
  | GetUserProfileSucess
  | GetUserProfileFailure;

export interface AccountState {
  isLoading: boolean;
  isAuthenticated: boolean;
  data: UserProfile | null;
  error: Error | null;
}
