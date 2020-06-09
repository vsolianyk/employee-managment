import { SagaIterator } from 'redux-saga';
import { call, fork, put, select, take } from 'redux-saga/effects';

import {
  getTeams,
  getTeamsFailure,
  getTeamsSuccess,
} from './../reducers/teams/teamsActions';
import { DELETE_TEAM, GET_TEAMS, SET_TEAMS_QUERY_PARAMS, CREATE_TEAM, UPDATE_TEAM } from './../reducers/teams/types';
import { AppState } from '../reducers';
import { closeModal, openModal } from '../reducers/modals/modalsActions';
import { addNotification } from '../reducers/notifications/notificationsActions';
import api from '../services';
import { OPEN_EDIT_TEAM_MODAL, OpenEditTeamModal } from '../reducers/teams/types';
import { TEAM_MODAL } from '../reducers/modals/types';

const getTeamsQueryParams = (state: AppState) => state.teams.params;

export function* setTeamsQueryParamsSaga(): SagaIterator {
  while (true) {
    try {
      yield take(SET_TEAMS_QUERY_PARAMS);
      yield put(getTeams());
    } catch (err) {
      yield put(addNotification({ message: 'Something went wrong', type: 'error' }));
    }
  }
}

export function* getTeamsSaga(): SagaIterator {
  while (true) {
    try {
      yield take(GET_TEAMS);
      const params = yield select(getTeamsQueryParams);
      const data = yield call(api.teams.fetchList, params);
      yield put(getTeamsSuccess(data));
    } catch (err) {
      yield put(getTeamsFailure(err));
    }
  }
}

export function* openEditTeamModalSaga(): SagaIterator {
  while (true) {
    try {
      const action: OpenEditTeamModal = yield take(OPEN_EDIT_TEAM_MODAL);
      const team = yield call(api.teams.fetchOne, action.payload.id);
      yield put(openModal(TEAM_MODAL, { ...action.payload.modalProps, team }, action.payload.containerProps));
    } catch (err) {
      const message = err.code ? err.message : 'Open team modal failed';
      yield put(addNotification({ message, type: 'error' }));
    }
  }
}

export function* createTeamSaga(): SagaIterator {
  while (true) {
    try {
      const action = yield take(CREATE_TEAM);
      yield call(api.teams.addOne, action.payload);
      yield put(getTeams());
      yield put(closeModal());
      yield put(addNotification({ type: 'success', message: 'Team created successfully' }));
    } catch (err) {
      const message = err.code ? err.message : 'Team creation failed';
      yield put(addNotification({ message, type: 'error' }));
    }
  }
}

export function* updateTeamSaga(): SagaIterator {
  while (true) {
    try {
      const action = yield take(UPDATE_TEAM);
      yield call(api.teams.updateOne, action.payload._id, action.payload);
      yield put(getTeams());
      yield put(closeModal());
      yield put(addNotification({ type: 'success', message: 'Team updated successfully' }));
    } catch (err) {
      const message = err.code ? err.message : 'Team update failed';
      yield put(addNotification({ message, type: 'error' }));
    }
  }
}

export function* deleteTeamSaga(): SagaIterator {
  while (true) {
    try {
      const action = yield take(DELETE_TEAM);
      yield call(api.teams.deleteOne, action.payload);
      yield put(getTeams());
      yield put(closeModal());
      yield put(addNotification({ type: 'success', message: 'Team deleted successfully' }));
    } catch (err) {
      const message = err.code ? err.message : 'Team deletion failed';
      yield put(addNotification({ message, type: 'error' }));
    }
  }
}

export function* teamsSaga(): SagaIterator {
  yield fork(setTeamsQueryParamsSaga);
  yield fork(getTeamsSaga);
  yield fork(openEditTeamModalSaga);
  yield fork(createTeamSaga);
  yield fork(updateTeamSaga);
  yield fork(deleteTeamSaga);
}
