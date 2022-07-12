import Teams from '../database/models/TeamsModel';
import { ITeam } from '../database/interfaces';

export default class TeamService {
  static async getAll(): Promise<ITeam[]> {
    const teams = await Teams.findAll();
    return teams as ITeam[];
  }
}
