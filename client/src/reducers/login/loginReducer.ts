import {
  LOGOUT_ACTION,
  GET_USER_PROFILE,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAILURE,
  AccountActions,
  AccountState,
} from './types';

const initialState: AccountState = {
  isLoading: true,
  isAuthenticated: false,
  data: null,
  error: null,
};

export function account(
  state = initialState,
  action: AccountActions,
): AccountState {
  switch (action.type) {
    case LOGOUT_ACTION:
      return initialState;
    case GET_USER_PROFILE:
      return { ...state, isLoading: true };
    case GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        data: action.payload,
      };
    case GET_USER_PROFILE_FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        data: null,
      };
    default:
      return state;
  }
}
