import { combineReducers } from 'redux';

import { employees } from './employees/employeesReducer';
import { EmployeesState } from './employees/types';
import { account } from './login/loginReducer';
import { AccountState } from './login/types';
import { modals } from './modals/modalsReducer';
import { ModalsState } from './modals/types';
import { teams } from './teams/teamsReducer';
import { TeamsState } from './teams/types';
import { UsersState } from './users/types';
import { users } from './users/usersReducer';
import { NotificationsState } from './notifications/types';
import { notifications } from './notifications/notificationsReducer';

export const reducer = combineReducers({
  account,
  teams,
  employees,
  users,
  modals,
  notifications,
});

export type AppState = {
  account: AccountState;
  teams: TeamsState;
  employees: EmployeesState;
  users: UsersState;
  modals: ModalsState;
  notifications: NotificationsState;
};
