import { SimpleUser } from './SimpleUser';
export class Team {
  _id: string = '';
  parent: {_id: string; name: string}|null = null;
  name: string = '';
  description: string = '';
  users: string[] = [];
  manager: SimpleUser|null = null;
  teamLead: SimpleUser|null = null;

  constructor(data?: Team) {
    Object.assign(this, data);
    this.manager = this.manager && new SimpleUser(this.manager);
    this.teamLead = this.teamLead && new SimpleUser(this.teamLead);
  }

  get membersCount() {
    return this.users.length;
  }

  get managerFullName() {
    return this.manager && this.manager.fullName;
  }

  get teamLeadFullName() {
    return this.teamLead && this.teamLead.fullName;
  }
}
