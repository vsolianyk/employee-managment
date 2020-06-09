import { SagaIterator } from 'redux-saga';
import { take, put, call } from 'redux-saga/effects';
import { getUserProfileSuccess, getUserProfileFailure } from './../reducers/login/loginActions';
import { GET_USER_PROFILE } from './../reducers/login/types';
import services from '../services';

export function* loginSaga(): SagaIterator {
  try {
    yield take(GET_USER_PROFILE);
    const data = yield call(services.users.loadCurrent);
    yield put(getUserProfileSuccess(data));
  } catch (err) {
    yield put(getUserProfileFailure(err));
  }
}