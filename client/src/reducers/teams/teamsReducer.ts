import { SortablePageIn } from '../../models/SortablePageIn';
import {
  SET_TEAMS_QUERY_PARAMS,
  GET_TEAMS,
  GET_TEAMS_FAILURE,
  GET_TEAMS_SUCCESS,
  TeamsActions,
  TeamsState,
} from './types';

const initialState: TeamsState = {
  isLoading: true,
  data: null,
  error: null,
  params: new SortablePageIn({ sortBy: 'name' }),
};

export function teams(
  state = initialState,
  action: TeamsActions,
): TeamsState {
  switch (action.type) {
    case SET_TEAMS_QUERY_PARAMS:
      return {
        ...state,
        params: action.payload,
      };
    case GET_TEAMS:
      return { ...state, isLoading: true };
    case GET_TEAMS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case GET_TEAMS_FAILURE:
      return {
        ...state,
        isLoading: false,
        data: null,
        error: action.error,
      };
    default:
      return state;
  }
}
