import BaseService from './BaseService';
import { Employee } from '../models/Employee';
import { SortablePageIn } from '../models/SortablePageIn';
import { SimpleUser } from '../models/SimpleUser';

class EmployeesService extends BaseService {
  fetchList = async (query: SortablePageIn): Promise<void> => {
    try {
      const { data } = await this.api.get('/profiles', query);

      data.results = data.results.map((t: Employee) => new Employee(t));

      return data;
    } catch (error) {
      this.handleError(error);
    }
  }

  fetchOne = async (id: string): Promise<void> => {
    try {
      const { data } = await this.api.get(`/profiles/${id}`);
      return data;
    } catch (error) {
      this.handleError(error);
    }
  }

  updateJobInfo = async (id: string, employee: Partial<Employee>): Promise<void> => {
    try {
      const { data } = await this.api.put(`/profiles/${id}/jobInfo`, employee);
      return data;
    } catch (error) {
      this.handleError(error);
    }
  }

  deleteOne = async (id: string): Promise<void> => {
    try {
      const { data } = await this.api.delete(`/profiles/${id}`);

      return data;
    } catch (error) {
      this.handleError(error);
    }
  }

  picker = async (searchText: string): Promise<SimpleUser[]> => {
    try {
      let { data } = await this.api.get<SimpleUser[]>('/profiles/picker', { searchText });

      data = data.map((t: SimpleUser) => new SimpleUser(t));

      return data;
    } catch (error) {
      this.handleError(error);
    }
  }
}

export default EmployeesService;
