import Match from '../database/models/MatchesModel';
import TeamsModel from '../database/models/TeamsModel';
import { IMatch, ISaveMatch, IUpdate } from '../database/interfaces';
// import TeamService from './TeamsService';

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
    return match as IMatch[];
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
    return match as IMatch[];
  };

  static saveMatches = async (match: ISaveMatch):Promise<ISaveMatch> => {
    const newMatch = await Match.create(match);
    return newMatch as ISaveMatch;
  };

  static updateMatch = async (id: number | string) => {
    await Match.update({ inProgress: false }, { where: { id } });
    return { message: 'Finished' };
  };

  // static getTeams = async (homeId: number, awayId: number) => {
  //   const homeTeam = TeamService.getById(homeId);
  //   const awayTeam = TeamService.getById(awayId);

  //   if (!homeTeam || !awayTeam) {
  //     return null;
  //   }
  // };

  static updateInProgress = async (match: IUpdate) => {
    const upMatch = await Match
      .update(
        { homeTeamGoals: match.homeTeamGoals, awayTeamGoals: match.awayTeamGoals },
        { where: { id: match.id } },
      );
    console.log(upMatch);
    return upMatch;
  };
}
