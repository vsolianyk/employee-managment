import BaseService from './BaseService';
import Api from './Api';
import { SortablePageIn } from '../models/SortablePageIn';
import { User } from '../models/User';

class UsersService extends BaseService {
  loadCurrent = async (): Promise<void> => {
    try {
      const { data } = await this.api.get('/users/current');

      return data;
    } catch (error) {
      this.handleError(error);
    }
  }

  fetchList = async (query: SortablePageIn): Promise<void> => {
    try {
      const { data } = await this.api.get('/users', query);

      data.results = data.results.map((t: User) => new User(t));

      return data;
    } catch (error) {
      this.handleError(error);
    }
  }

  addOne = async (user: User): Promise<void> => {
    try {
      const { data } = await this.api.post('/users', user);

      return data;
    } catch (error) {
      this.handleError(error);
    }
  }

  updateOne = async (id: string, user: User): Promise<void> => {
    try {
      const { data } = await this.api.put(`/users/${id}`, user);

      return data;
    } catch (error) {
      this.handleError(error);
    }
  }

  deleteOne = async (id: string): Promise<void> => {
    try {
      const { data } = await this.api.delete(`/users/${id}`);

      return data;
    } catch (error) {
      this.handleError(error);
    }
  }
}

export default UsersService;
