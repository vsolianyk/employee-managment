import { SagaIterator } from 'redux-saga';
import { take, put, call, fork, select } from 'redux-saga/effects';
import {
  getEmployees,
  getEmployeesSuccess,
  getEmployeesFailure,
  getEmployeeSuccess,
  getEmployeeFailure,
} from './../reducers/employees/employeesActions';
import { GET_EMPLOYEES, GET_EMPLOYEE, SET_EMPLOYEES_QUERY_PARAMS, UPDATE_EMPLOYEE_JOB_INFO } from './../reducers/employees/types';
import api from '../services';
import { AppState } from '../reducers';
import { addNotification } from '../reducers/notifications/notificationsActions';
import { closeModal } from '../reducers/modals/modalsActions';

const getEmployeesQueryParams = (state: AppState) => state.employees.params;

export function* setEmployeesQueryParamsSaga(): SagaIterator {
  while (true) {
    try {
      yield take(SET_EMPLOYEES_QUERY_PARAMS);
      yield put(getEmployees());
    } catch (err) {
      yield put(addNotification({ message: 'Something went wrong', type: 'error' }));
    }
  }
}

export function* getEmployeesSaga(): SagaIterator {
  while (true) {
    try {
      yield take(GET_EMPLOYEES);
      const params = yield select(getEmployeesQueryParams);
      const data = yield call(api.employees.fetchList, params);
      yield put(getEmployeesSuccess(data));
    } catch (err) {
      yield put(getEmployeesFailure(err));
    }
  }
}

export function* updateEmployeeJobInfoSaga(): SagaIterator {
  while (true) {
    try {
      const action = yield take(UPDATE_EMPLOYEE_JOB_INFO);
      yield call(api.employees.updateJobInfo, action.payload._id, action.payload);
      yield put(getEmployees());
      yield put(closeModal());
      yield put(addNotification({ type: 'success', message: 'Employee job info updated successfully' }));
    } catch (err) {
      const message = err.code ? err.message : 'Employee update failed';
      yield put(addNotification({ message, type: 'error' }));
    }
  }
}

export function* getEmployeeSaga(): SagaIterator {
  while (true) {
    try {
      const action = yield take(GET_EMPLOYEE);
      const data = yield call(api.employees.fetchOne, action.payload);
      yield put(getEmployeeSuccess(data));
    } catch (err) {
      yield put(getEmployeeFailure(err));
    }
  }
}

export function* employeesSaga(): SagaIterator {
  yield fork(setEmployeesQueryParamsSaga);
  yield fork(getEmployeesSaga);
  yield fork(updateEmployeeJobInfoSaga);
  yield fork(getEmployeeSaga);
}
