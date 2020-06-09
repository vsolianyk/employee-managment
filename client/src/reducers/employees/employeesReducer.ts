import { SortablePageIn } from '../../models/SortablePageIn';
import {
  SET_EMPLOYEES_QUERY_PARAMS,
  GET_EMPLOYEES,
  GET_EMPLOYEES_SUCCESS,
  GET_EMPLOYEES_FAILURE,
  EmployeesActions,
  EmployeesState,
} from './types';

const initialState: EmployeesState = {
  isLoading: true,
  data: null,
  error: null,
  params: new SortablePageIn({ sortBy: 'email' }),
};

export function employees(
  state = initialState,
  action: EmployeesActions,
): EmployeesState {
  switch (action.type) {
    case SET_EMPLOYEES_QUERY_PARAMS:
      return {
        ...state,
        params: action.payload,
      };
    case GET_EMPLOYEES:
      return { ...state, isLoading: true };
    case GET_EMPLOYEES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case GET_EMPLOYEES_FAILURE:
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
