import { SagaIterator } from 'redux-saga';
import { take, put, call, fork, select } from 'redux-saga/effects';
import {
  getUsers,
  getUsersSuccess,
  getUsersFailure,
} from './../reducers/users/usersActions';
import { GET_USERS, SET_USERS_QUERY_PARAMS, DELETE_USER, ADD_USER, UPDATE_USER } from './../reducers/users/types';
import api from '../services';
import { closeModal } from '../reducers/modals/modalsActions';
import { addNotification } from '../reducers/notifications/notificationsActions';
import { AppState } from '../reducers/index';

const getUsersQueryParams = (state: AppState) => state.users.params;

export function* setUsersQueryParamsSaga(): SagaIterator {
  while (true) {
    try {
      yield take(SET_USERS_QUERY_PARAMS);
      yield put(getUsers());
    } catch (err) {
      yield put(addNotification({ message: 'Something went wrong', type: 'error' }));
    }
  }
}

export function* getUsersSaga(): SagaIterator {
  while (true) {
    try {
      yield take(GET_USERS);
      const params = yield select(getUsersQueryParams);
      const data = yield call(api.users.fetchList, params);
      yield put(getUsersSuccess(data));
    } catch (err) {
      yield put(getUsersFailure(err));
    }
  }
}

export function* addUserSaga(): SagaIterator {
  while (true) {
    try {
      const action = yield take(ADD_USER);
      yield call(api.users.addOne, action.payload);
      yield put(getUsers());
      yield put(closeModal());
    } catch (err) {
      const message = err.code ? err.message : 'User create failed';
      yield put(addNotification({ message, type: 'error' }));
    }
  }
}

export function* updateUserSaga(): SagaIterator {
  while (true) {
    try {
      const action = yield take(UPDATE_USER);
      yield call(api.users.updateOne, action.payload._id, action.payload);
      yield put(getUsers());
      yield put(closeModal());
      yield put(addNotification({ type: 'success', message: 'User updated successfully' }));
    } catch (err) {
      const message = err.code ? err.message : 'User update failed';
      yield put(addNotification({ message, type: 'error' }));
    }
  }
}

export function* deleteUserSaga(): SagaIterator {
  while (true) {
    try {
      const action = yield take(DELETE_USER);
      yield call(api.users.deleteOne, action.payload);
      yield put(getUsers());
      yield put(closeModal());
      yield put(addNotification({ type: 'success', message: 'User deleted successfully' }));
    } catch (err) {
      const message = err.code ? err.message : 'User update failed';
      yield put(addNotification({ message, type: 'error' }));
    }
  }
}

export function* usersSaga(): SagaIterator {
  yield fork(setUsersQueryParamsSaga);
  yield fork(getUsersSaga);
  yield fork(addUserSaga);
  yield fork(updateUserSaga);
  yield fork(deleteUserSaga);
}
