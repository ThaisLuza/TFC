import Match from '../database/models/MatchesModel';
import TeamsModel from '../database/models/TeamsModel';
import { IMatch, ISaveMatch } from '../database/interfaces';

export default class MatchesService {
  static getAll = async () :Promise<IMatch[]> => {
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
  };

  static getInProgress = async (inProgress:boolean) : Promise<IMatch[]> => {
    const match = await Match.findAll({
      where: { inProgress },
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
  };

  static saveMatches = async (match: ISaveMatch):Promise<ISaveMatch> => {
    const newMatch = await Match.create(match);
    return newMatch as ISaveMatch;
  };

  static updateMatch = async (id: number | string) => {
    await Match.update({ inProgress: false }, { where: { id } });
    return { message: 'Finished' };
  };

  // public static async getById(id: number) {
  //   await Match.findByPk(id)
  // }
}
