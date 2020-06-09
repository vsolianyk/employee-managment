import Api from './Api';
import UsersService from './UsersService';
import TeamsService from './TeamsService';
import EmployeesService from './EmployeesService';
import config from '../config';

class Services {
  users: UsersService;
  teams: TeamsService;
  employees: EmployeesService;
  // continue...

  constructor() {
    const api = new Api(config.baseApiUrl);

    this.users = new UsersService(api);
    this.teams = new TeamsService(api);
    this.employees = new EmployeesService(api);
  }
}

export default new Services();
