import { Response, NextFunction, Request } from 'express';
// import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
// import MatchesService from '../services/MatchesService';
import TeamService from '../services/TeamsService';

// const secret = process.env.JWT_SECRET || 'jwt_secret';

function validateMatch(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  console.log(authorization);
  const { homeTeam, awayTeam } = req.body;

  if ((authorization as string).length < 15) {
    console.log('caiu no if');
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  // jwt.verify(authorization as string, secret);

  if (homeTeam === awayTeam) {
    return res.status(401).json({
      message: 'It is not possible to create a match with two equal teams',
    });
  }

  next();
}

async function verifyTeams(req: Request, res: Response, next: NextFunction) {
  const { homeTeam, awayTeam } = req.body;

  const homeTeams = await TeamService.getById(homeTeam);
  // console.log(homeTeams);
  if (!homeTeams) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }
  const awayTeams = await TeamService.getById(awayTeam);
  // console.log(awayTeams);
  if (!awayTeams) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }
  // console.log(homeTeams, awayTeams);
  // if (!homeTeams.id || !awayTeams.id) {
  //   console.log('caiu no if');
  //   return res.status(404).json({ message: 'There is no team with such id!' });
  // }
  // console.log('nao cai no if');
  next();
}

export { validateMatch, verifyTeams };
