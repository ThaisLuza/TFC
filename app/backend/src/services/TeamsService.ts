import Teams from '../database/models/TeamsModel';
import { ITeam } from '../database/interfaces';

export default class TeamService {
  static async getById(id:number): Promise<ITeam> {
    const team = await Teams.findByPk(id);
    return team as ITeam;
  }

  static async getAll(): Promise<ITeam[]> {
    const teams = await Teams.findAll();
    return teams as ITeam[];
  }
}
