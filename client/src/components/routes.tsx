import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
// core pages for layout

import Profile from './pages/profile';
import Teams from './pages/teams';
import Employees from './pages/employees';
import Users from './pages/users';
import { UserRoles } from '../models/UserRoles';


export interface RouteConfig {
  path: string;
  name: string;
  isForNav: boolean;
  exact?: true;
  roles: UserRoles[];
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}

export const arrayOfRoles = [UserRoles.HR, UserRoles.Employee, UserRoles.PM, UserRoles.Chief];

export const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Profile',
    isForNav: false,
    exact: true,
    roles: [UserRoles.Employee, UserRoles.HR, UserRoles.PM, UserRoles.Chief],
    component: Profile,
  },
  {
    path: '/users',
    name: 'Users',
    isForNav: true,
    exact: true,
    roles: [UserRoles.HR, UserRoles.Chief],
    component: Users,
  },
  {
    path: '/employees',
    name: 'Employees',
    isForNav: true,
    exact: true,
    roles: [UserRoles.HR, UserRoles.PM, UserRoles.Chief],
    component: Employees,
  },
  {
    path: '/teams',
    name: 'Teams',
    isForNav: true,
    exact: true,
    roles: [UserRoles.HR, UserRoles.PM, UserRoles.Chief],
    component: Teams,
  },
  // {
  //   path: '/jobs',
  //   isForNav: true,
  //   name: 'Job Openings',
  //   roles: [UserRoles.HR, UserRoles.PM, UserRoles.Chief],
  //   component: () => <h1>Job Openings</h1>,
  // },
  // {
  //   path: '/requests',
  //   name: 'Requests',
  //   isForNav: true,
  //   roles: [UserRoles.HR, UserRoles.Employee, UserRoles.Chief],
  //   component: () => <h1>Requests</h1>,
  // },
];
