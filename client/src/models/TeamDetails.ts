import { SimpleUser } from './SimpleUser';
export class TeamDetails {
  _id: string = '';
  parent: {_id: string; name: string}|null = null;
  name: string = '';
  description: string = '';
  users: SimpleUser[] = [];
  manager: SimpleUser|null = null;
  teamLead: SimpleUser|null = null;

  constructor(data?: TeamDetails) {
    Object.assign(this, data);
    this.manager = this.manager && new SimpleUser(this.manager);
    this.teamLead = this.teamLead && new SimpleUser(this.teamLead);
    this.users = this.users && this.users.map(u => new SimpleUser(u));
  }
}
