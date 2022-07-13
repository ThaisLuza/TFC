import Match from '../database/models/MatchesModel';
import TeamsModel from '../database/models/TeamsModel';
import { IMatch } from '../database/interfaces';

export default class MatchesService {
  public static async getAll(): Promise<IMatch[]> {
    const match = await Match.findAll({
      include: [
        {
          model: TeamsModel,
          as: 'teamHome',
          attributes: { exclude: ['id'] },
        },
        {
          model: TeamsModel,
          as: 'teamAway',
          attributes: { exclude: ['id'] },
        },
      ],
    });
    return match as unknown as IMatch[];
  }
}
