import { SortablePageIn } from '../../models/SortablePageIn';
import {
  GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
  SET_USERS_QUERY_PARAMS,
  DELETE_USER,
  ADD_USER,
  UPDATE_USER,
  UsersActions,
  } from './types';
import { PageInResponse } from '../../models/PageInResponse';
import { User } from '../../models/User';
import { ResponseError } from '../../models/ResponseError';

export function getUsers(): UsersActions {
  return {
    type: GET_USERS,
  };
}

export function getUsersSuccess(data: PageInResponse<User>): UsersActions {
  return {
    type: GET_USERS_SUCCESS,
    payload: data,
  };
}

export function getUsersFailure(error: ResponseError): UsersActions {
  return {
    type: GET_USERS_FAILURE,
    error,
  };
}

export function setUsersQueryParamsUsers(query: SortablePageIn): UsersActions {
  return {
    type: SET_USERS_QUERY_PARAMS,
    payload: query,
  };
}

export function deleteUser(id: string): UsersActions {
  return {
    type: DELETE_USER,
    payload: id,
  };
}

export function addUser(data: User): UsersActions {
  return {
    type: ADD_USER,
    payload: data,
  };
}

export function updateUser(data: User): UsersActions {
  return {
    type: UPDATE_USER,
    payload: data,
  };
}
