export class Employee {
  _id: string = '';
  userId: string = '';
  email: string = '';
  firstName: string = '';
  lastName: string = '';
  hireDate: Date|null = null;
  timeOffStartDate: Date|null = null;
  teams: SimpleTeam[] = [];
  title: string = '';
  office: string = '';

  constructor(data?: Employee) {
    Object.assign(this, data);

    this.hireDate = this.hireDate && new Date(this.hireDate);
    this.timeOffStartDate = this.timeOffStartDate && new Date(this.timeOffStartDate);
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

interface SimpleTeam {
  _id: string;
  name: string;
}
