import { PageInResponse } from '../../models/PageInResponse';
import { ResponseError } from '../../models/ResponseError';
import { SortablePageIn } from '../../models/SortablePageIn';
import { Team } from '../../models/Team';
import { TeamDetails } from '../../models/TeamDetails';
import {
  OPEN_EDIT_TEAM_MODAL,
  CREATE_TEAM,
  UPDATE_TEAM,
  DELETE_TEAM,
  GET_TEAMS,
  GET_TEAMS_FAILURE,
  GET_TEAMS_SUCCESS,
  SET_TEAMS_QUERY_PARAMS,
  TeamsActions,
} from './types';

export function setTeamsQyeryParams(query: SortablePageIn): TeamsActions {
  return {
    type: SET_TEAMS_QUERY_PARAMS,
    payload: query,
  };
}

export function getTeams(): TeamsActions {
  return {
    type: GET_TEAMS,
  };
}

export function getTeamsSuccess(data: PageInResponse<Team>): TeamsActions {
  return {
    type: GET_TEAMS_SUCCESS,
    payload: data,
  };
}

export function getTeamsFailure(error: ResponseError): TeamsActions {
  return {
    type: GET_TEAMS_FAILURE,
    error,
  };
}

export function openEditTeamModal(id: string, modalProps: any, containerProps: any): TeamsActions {
  return {
    type: OPEN_EDIT_TEAM_MODAL,
    payload: {
      id,
      containerProps,
      modalProps,
    },
  };
}

export function createTeam(team: TeamDetails): TeamsActions {
  return {
    type: CREATE_TEAM,
    payload: team,
  };
}

export function updateTeam(team: TeamDetails): TeamsActions {
  return {
    type: UPDATE_TEAM,
    payload: team,
  };
}

export function deleteTeam(id: string): TeamsActions {
  return {
    type: DELETE_TEAM,
    payload: id,
  };
}
