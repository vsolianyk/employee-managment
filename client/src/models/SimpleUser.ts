export class SimpleUser {
  _id: string = '';
  firstName: string = '';
  lastName: string = '';
  email?: string;
  title?: string;

  constructor(data?: Partial<SimpleUser>) {
    Object.assign(this, data);
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
