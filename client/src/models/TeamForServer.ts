import { TeamDetails } from './TeamDetails';
export class TeamForServer {
  parent: string|null = null;
  name: string = '';
  description: string = '';
  users: string[] = [];
  manager: string | null;
  teamLead: string | null;

  constructor(data: TeamDetails) {
    this.name = data.name;
    this.description = data.description;
    this.parent = data.parent ? data.parent._id : null;
    this.manager = data.manager ? data.manager._id : null;
    this.teamLead = data.teamLead ? data.teamLead._id : null;
    this.users = data.users.map(u => u._id);
  }
}
