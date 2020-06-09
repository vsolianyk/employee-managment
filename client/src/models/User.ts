import { UserRoles } from './UserRoles';
export class User {
  _id: string = '';
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  role: UserRoles = UserRoles.Employee;
  isActive: boolean = true;

  constructor(data?: Partial<User>) {
    Object.assign(this, data);
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
