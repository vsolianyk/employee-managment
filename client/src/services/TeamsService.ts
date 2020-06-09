import { SortablePageIn } from '../models/SortablePageIn';
import { Team } from '../models/Team';
import { TeamDetails } from '../models/TeamDetails';
import { TeamForServer } from '../models/TeamForServer';
import BaseService from './BaseService';

class TeamsService extends BaseService {
  fetchList = async (query: SortablePageIn): Promise<void> => {
    try {
      const { data } = await this.api.get('/teams', query);

      data.results = data.results.map((t: Team) => new Team(t));

      return data;
    } catch (error) {
      this.handleError(error);
    }
  }

  addOne = async (team: TeamDetails): Promise<void> => {
    try {
      const forSave = new TeamForServer(team);
      const { data } = await this.api.post('/teams', forSave);
      return data;
    } catch (error) {
      this.handleError(error);
    }
  }

  fetchOne = async (id: string): Promise<TeamDetails> => {
    try {
      const { data } = await this.api.get(`/teams/${id}`);
      return new TeamDetails(data);
    } catch (error) {
      this.handleError(error);
    }
  }

  updateOne = async (id: string, team: TeamDetails): Promise<void> => {
    try {
      const forSave = new TeamForServer(team);
      const { data } = await this.api.put(`/teams/${id}`, forSave);
      return data;
    } catch (error) {
      this.handleError(error);
    }
  }

  deleteOne = async (id: string): Promise<void> => {
    try {
      const { data } = await this.api.delete(`/teams/${id}`);

      return data;
    } catch (error) {
      this.handleError(error);
    }
  }
}

export default TeamsService;
