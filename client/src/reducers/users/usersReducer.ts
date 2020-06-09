import { SortablePageIn } from '../../models/SortablePageIn';
import {
  GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
  SET_USERS_QUERY_PARAMS,
  UsersActions,
  UsersState,
} from './types';

const initialState: UsersState = {
  isLoading: true,
  data: null,
  error: null,
  params: new SortablePageIn({ sortBy: 'email' }),
};

export function users(
  state = initialState,
  action: UsersActions,
): UsersState {
  switch (action.type) {
    case GET_USERS:
      return { ...state, isLoading: true };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case GET_USERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        data: null,
        error: action.error,
      };
    case SET_USERS_QUERY_PARAMS:
      return {
        ...state,
        params: action.payload,
      };
    default:
      return state;
  }
}
