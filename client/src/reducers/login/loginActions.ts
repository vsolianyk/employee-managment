import {
  LOGOUT_ACTION,
  GET_USER_PROFILE,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAILURE,
  UserProfile,
  AccountActions,
} from './types';

export function logout(): AccountActions {
  return {
    type: LOGOUT_ACTION,
  };
}

export function getUserProfile(): AccountActions {
  return {
    type: GET_USER_PROFILE,
  };
}

export function getUserProfileSuccess(data: UserProfile): AccountActions {
  return {
    type: GET_USER_PROFILE_SUCCESS,
    payload: data,
  };
}

export function getUserProfileFailure(error: Error): AccountActions {
  return {
    error,
    type: GET_USER_PROFILE_FAILURE,
  };
}
