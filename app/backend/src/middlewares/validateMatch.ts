import { Response, NextFunction, Request } from 'express';

export default function validateMatch(req: Request, res:Response, _next:NextFunction) {
  const { homeTeam, awayTeam } = req.body;

  if (homeTeam === awayTeam) {
    res.status(401).json({ message: 'It is not possible to create a match with two equal teams' });
  }
}
