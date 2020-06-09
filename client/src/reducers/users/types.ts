import { PageInResponse } from '../../models/PageInResponse';
import { User } from '../../models/User';
import { SortablePageIn } from '../../models/SortablePageIn';
import { ResponseError } from '../../models/ResponseError';

export const GET_USERS = 'GET_USERS';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_FAILURE = 'GET_USERS_FAILURE';

export const SET_USERS_QUERY_PARAMS = 'SET_USERS_QUERY_PARAMS';

export const DELETE_USER = 'DELETE_USER';

export const ADD_USER = 'ADD_USER';

export const UPDATE_USER = 'UPDATE_USER';

export type GET_USERS = typeof GET_USERS;
export type GET_USERS_SUCCESS = typeof GET_USERS_SUCCESS;
export type GET_USERS_FAILURE = typeof GET_USERS_FAILURE;

export type SET_USERS_QUERY_PARAMS = typeof SET_USERS_QUERY_PARAMS;

export type DELETE_USER = typeof DELETE_USER;

export type ADD_USER = typeof ADD_USER;

export type UPDATE_USER = typeof UPDATE_USER;

export interface SetUsersQueryParams {
  type: SET_USERS_QUERY_PARAMS;
  payload: SortablePageIn;
}

export interface GetUsers {
  type: GET_USERS;
}

export interface GetUsersSucess {
  type: GET_USERS_SUCCESS;
  payload: PageInResponse<User>;
}

export interface GetUsersFailure {
  type: GET_USERS_FAILURE;
  error: ResponseError;
}

export interface DeleteUser {
  type: DELETE_USER;
  payload: string;
}

export interface AddUser {
  type: ADD_USER;
  payload: User;
}

export interface UpdateUser {
  type: UPDATE_USER;
  payload: User;
}

// Union type
export type UsersActions =
  | GetUsers
  | GetUsersSucess
  | GetUsersFailure
  | SetUsersQueryParams
  | DeleteUser
  | AddUser
  | UpdateUser;

export interface UsersState {
  isLoading: boolean;
  data: PageInResponse<User> | null;
  error: ResponseError | null;
  params: SortablePageIn;
}
