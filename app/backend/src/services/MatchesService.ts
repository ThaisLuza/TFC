import Match from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';
import { IMatch } from '../database/interfaces';

export default class MatchsService {
  static async getAll(): Promise<IMatch[]> {
    const match = await Match.findAll({
      include: [
        {
          model: Teams,
          as: 'teamHome',
          attributes: { exclude: ['id'] },
        },
        {
          model: Teams,
          as: 'teamAway',
          attributes: { exclude: ['id'] },
        },
      ],
    });
    return match as unknown as IMatch[];
  }
}
