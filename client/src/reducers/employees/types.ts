import { Employee } from '../../models/Employee';
import { PageInResponse } from '../../models/PageInResponse';
import { ResponseError } from '../../models/ResponseError';
import { SortablePageIn } from '../../models/SortablePageIn';

export const SET_EMPLOYEES_QUERY_PARAMS = 'SET_EMPLOYEES_QUERY_PARAMS';

export const GET_EMPLOYEES = 'GET_EMPLOYEES';
export const GET_EMPLOYEES_SUCCESS = 'GET_EMPLOYEES_SUCCESS';
export const GET_EMPLOYEES_FAILURE = 'GET_EMPLOYEES_FAILURE';

export const UPDATE_EMPLOYEE_JOB_INFO = 'UPDATE_EMPLOYEE_JOB_INFO';

export const GET_EMPLOYEE = 'GET_EMPLOYEE';
export const GET_EMPLOYEE_SUCCESS = 'GET_EMPLOYEE_SUCCESS';
export const GET_EMPLOYEE_FAILURE = 'GET_EMPLOYEE_FAILURE';

export type SET_EMPLOYEES_QUERY_PARAMS = typeof SET_EMPLOYEES_QUERY_PARAMS;

export type GET_EMPLOYEES = typeof GET_EMPLOYEES;
export type GET_EMPLOYEES_SUCCESS = typeof GET_EMPLOYEES_SUCCESS;
export type GET_EMPLOYEES_FAILURE = typeof GET_EMPLOYEES_FAILURE;

export type UPDATE_EMPLOYEE_JOB_INFO = typeof UPDATE_EMPLOYEE_JOB_INFO;

export type GET_EMPLOYEE = typeof GET_EMPLOYEE;
export type GET_EMPLOYEE_SUCCESS = typeof GET_EMPLOYEE_SUCCESS;
export type GET_EMPLOYEE_FAILURE = typeof GET_EMPLOYEE_FAILURE;

export interface SetEmployeesQueryParams {
  type: SET_EMPLOYEES_QUERY_PARAMS;
  payload: SortablePageIn;
}
export interface GetEmployees {
  type: GET_EMPLOYEES;
}

export interface GetEmployeesSucess {
  type: GET_EMPLOYEES_SUCCESS;
  payload: PageInResponse<Employee>;
}

export interface GetEmployeesFailure {
  type: GET_EMPLOYEES_FAILURE;
  error: ResponseError;
}

export interface UpdateEmployeeJobInfo {
  type: UPDATE_EMPLOYEE_JOB_INFO;
  payload: Employee;
}

export interface GetEmployee {
  type: GET_EMPLOYEE;
  payload: string;
}

export interface GetEmployeeSucess {
  type: GET_EMPLOYEE_SUCCESS;
  payload: Employee;
}

export interface GetEmployeeFailure {
  type: GET_EMPLOYEE_FAILURE;
  error: ResponseError;
}


// Union type
export type EmployeesActions =
  | SetEmployeesQueryParams
  | GetEmployees
  | GetEmployeesSucess
  | GetEmployeesFailure
  | UpdateEmployeeJobInfo
  | GetEmployee
  | GetEmployeeSucess
  | GetEmployeeFailure;

export interface EmployeesState {
  isLoading: boolean;
  data: PageInResponse<Employee> | null;
  error: ResponseError | null;
  params: SortablePageIn;
}

export interface EmployeeState {
  isLoading: boolean;
  data: Employee | null;
  error: ResponseError | null;
}
