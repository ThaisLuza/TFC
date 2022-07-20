import { ILeaderBoard, IScore } from '../database/interfaces';

export const totalPoints = (team: IScore[]) => {
  let count = 0;
  team.forEach((t) => {
    if (t.homeTeamGoals > t.awayTeamGoals) count += 3;
    if (t.homeTeamGoals === t.awayTeamGoals) count += 1;
  });
  // console.log(count);
  return count;
};

export const totalLosses = (team: IScore[]) => {
  let count = 0;
  team.forEach((t) => {
    if (t.homeTeamGoals < t.awayTeamGoals) count += 1;
  });
  return count;
};

export const totalVictories = (team: IScore[]) => {
  let count = 0;
  team.forEach((t) => {
    if (t.homeTeamGoals > t.awayTeamGoals) count += 1;
  });
  return count;
};

export const totalDraws = (team: IScore[]) => {
  let count = 0;
  team.forEach((t) => {
    if (t.homeTeamGoals === t.awayTeamGoals) count += 1;
  });
  return count;
};

export const goalsFavor = (team: IScore[]) => {
  let count = 0;
  team.forEach((t) => {
    count += t.homeTeamGoals;
  });
  // console.log(team)
  // console.log(count);
  return count;
};

export const goalsOwn = (team: IScore[]) => {
  let count = 0;
  team.forEach((t) => {
    count += t.awayTeamGoals;
  });
  return count;
};

export const efficiency = (team: IScore[]) => {
  const points = totalPoints(team);
  const games = team.length;

  const eff = (points / (games * 3)) * 100;
  return eff.toFixed(2);
};

export const learderOrder = (team: ILeaderBoard[]) => {
  team.sort((teamA, teamB) => {
    if (teamA.totalPoints < teamB.totalPoints) { return 1; }
    if (teamA.totalPoints > teamB.totalPoints) { return -1; }
    if (teamA.totalVictories < teamB.totalVictories) { return 1; }
    if (teamA.totalVictories > teamB.totalVictories) { return -1; }
    if (teamA.goalsBalance < teamB.goalsBalance) { return 1; }
    if (teamA.goalsBalance > teamB.goalsBalance) { return -1; }
    if (teamA.goalsFavor < teamB.goalsFavor) { return 1; }
    if (teamA.goalsFavor > teamB.goalsFavor) { return -1; }
    if (teamA.goalsOwn < teamB.goalsOwn) { return 1; }
    if (teamA.goalsOwn > teamB.goalsOwn) { return -1; }
    return 0;
  });
  return team;
};
