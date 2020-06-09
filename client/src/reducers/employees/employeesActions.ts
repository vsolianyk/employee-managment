import { SortablePageIn } from '../../models/SortablePageIn';
import {
  SET_EMPLOYEES_QUERY_PARAMS,
  GET_EMPLOYEES,
  GET_EMPLOYEES_SUCCESS,
  GET_EMPLOYEES_FAILURE,
  UPDATE_EMPLOYEE_JOB_INFO,
  GET_EMPLOYEE,
  GET_EMPLOYEE_SUCCESS,
  GET_EMPLOYEE_FAILURE,
  EmployeesActions,
  } from './types';
import { PageInResponse } from '../../models/PageInResponse';
import { Employee } from '../../models/Employee';
import { ResponseError } from '../../models/ResponseError';

export function setEmployeesQyeryParams(query: SortablePageIn): EmployeesActions {
  return {
    type: SET_EMPLOYEES_QUERY_PARAMS,
    payload: query,
  };
}

export function getEmployees(): EmployeesActions {
  return {
    type: GET_EMPLOYEES,
  };
}

export function getEmployeesSuccess(data: PageInResponse<Employee>): EmployeesActions {
  return {
    type: GET_EMPLOYEES_SUCCESS,
    payload: data,
  };
}

export function getEmployeesFailure(error: ResponseError): EmployeesActions {
  return {
    type: GET_EMPLOYEES_FAILURE,
    error,
  };
}

export function updateEmployeeJobInfo(data: Employee): EmployeesActions {
  return {
    type: UPDATE_EMPLOYEE_JOB_INFO,
    payload: data,
  };
}

export function getEmployee(id: string): EmployeesActions {
  return {
    type: GET_EMPLOYEE,
    payload: id,
  };
}

export function getEmployeeSuccess(data: Employee): EmployeesActions {
  return {
    type: GET_EMPLOYEE_SUCCESS,
    payload: data,
  };
}

export function getEmployeeFailure(error: ResponseError): EmployeesActions {
  return {
    type: GET_EMPLOYEE_FAILURE,
    error,
  };
}
