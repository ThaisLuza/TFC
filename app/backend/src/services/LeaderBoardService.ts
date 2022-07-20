import { efficiency, goalsFavor,
  goalsOwn,
  learderOrder, totalDraws, totalLosses, totalPoints, totalVictories } from '../utils/learderOrder';
import Matches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';
import { ILeader, ILeaderBoard } from '../database/interfaces';

const mapMatches = (data: ILeader[]) => {
  const leaderBoard = data.map((t) =>
  // const totalPointsFunc = totalPoints(data.teamHome);
  // const totalPointsGames = totalGames(data.teamHome);
    ({
      name: t.teamName,
      totalPoints: totalPoints(t.teamHome),
      totalGames: t.teamHome.length,
      totalVictories: totalVictories(t.teamHome),
      totalDraws: totalDraws(t.teamHome),
      totalLosses: totalLosses(t.teamHome),
      goalsFavor: goalsFavor(t.teamHome),
      goalsOwn: goalsOwn(t.teamHome),
      goalsBalance: goalsFavor(t.teamHome) - goalsOwn(t.teamHome),
      efficiency: Number(efficiency(t.teamHome)),
    }));
  return leaderBoard as unknown as ILeaderBoard[];
};
export default class LeaderboardService {
  public static getMatches = async () => {
    const matches = await
    Teams.findAll({
      include: {
        model: Matches,
        as: 'teamHome',
        attributes: { exclude: ['id', 'homeTeam', 'awayTeam', 'inProgress'] },
        where: { inProgress: false },
      },
      attributes: { exclude: ['id'] },
    }) as unknown as ILeader[];

    const board = mapMatches(matches);
    const ordered = learderOrder(board);
    // console.log(ordered);
    return ordered;
  };
}
