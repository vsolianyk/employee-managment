import { fork } from 'redux-saga/effects';
import { loginSaga } from './loginSaga';
import { teamsSaga } from './teamsSaga';
import { employeesSaga } from './employeesSaga';

import { usersSaga } from './usersSaga';

export default function* root() {
  yield fork(loginSaga);
  yield fork(teamsSaga);
  yield fork(employeesSaga);
  yield fork(usersSaga);
}
