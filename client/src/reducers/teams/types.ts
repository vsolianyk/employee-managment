import { PageInResponse } from '../../models/PageInResponse';
import { ResponseError } from '../../models/ResponseError';
import { SortablePageIn } from '../../models/SortablePageIn';
import { Team } from '../../models/Team';
import { TeamDetails } from '../../models/TeamDetails';

export const SET_TEAMS_QUERY_PARAMS = 'SET_TEAMS_QUERY_PARAMS';

export const GET_TEAMS = 'GET_TEAMS';
export const GET_TEAMS_SUCCESS = 'GET_TEAMS_SUCCESS';
export const GET_TEAMS_FAILURE = 'GET_TEAMS_FAILURE';

export const OPEN_EDIT_TEAM_MODAL = 'OPEN_EDIT_TEAM_MODAL';

export const CREATE_TEAM = 'CREATE_TEAM';
export const UPDATE_TEAM = 'UPDATE_TEAM';
export const DELETE_TEAM = 'DELETE_TEAM';

export type SET_TEAMS_QUERY_PARAMS = typeof SET_TEAMS_QUERY_PARAMS;

export type GET_TEAMS = typeof GET_TEAMS;
export type GET_TEAMS_SUCCESS = typeof GET_TEAMS_SUCCESS;
export type GET_TEAMS_FAILURE = typeof GET_TEAMS_FAILURE;

export type OPEN_EDIT_TEAM_MODAL = typeof OPEN_EDIT_TEAM_MODAL;

export type CREATE_TEAM = typeof CREATE_TEAM;
export type UPDATE_TEAM = typeof UPDATE_TEAM;
export type DELETE_TEAM = typeof DELETE_TEAM;

export interface SetTeamsQueryParams {
  type: SET_TEAMS_QUERY_PARAMS;
  payload: SortablePageIn;
}
export interface GetTeams {
  type: GET_TEAMS;
}

export interface GetTeamsSucess {
  type: GET_TEAMS_SUCCESS;
  payload: PageInResponse<Team>;
}

export interface GetTeamsFailure {
  type: GET_TEAMS_FAILURE;
  error: ResponseError;
}

export interface OpenEditTeamModal {
  type: OPEN_EDIT_TEAM_MODAL;
  payload: {
    id: string;
    modalProps: any;
    containerProps: any;
  };
}

export interface CreateTeam {
  type: CREATE_TEAM;
  payload: TeamDetails;
}

export interface UpdateTeam {
  type: UPDATE_TEAM;
  payload: TeamDetails;
}

export interface DeleteTeam {
  type: DELETE_TEAM;
  payload: string;
}

// Union type
export type TeamsActions =
  | SetTeamsQueryParams
  | GetTeams
  | GetTeamsSucess
  | GetTeamsFailure
  | OpenEditTeamModal
  | CreateTeam
  | UpdateTeam
  | DeleteTeam;

export interface TeamsState {
  isLoading: boolean;
  data: PageInResponse<Team> | null;
  error: ResponseError | null;
  params: SortablePageIn;
}
