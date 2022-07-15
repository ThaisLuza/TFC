import { Response, NextFunction, Request } from 'express';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

const secret = process.env.JWT_SECRET || 'jwt_secret';

export default function validateMatch(req: Request, res:Response, next:NextFunction) {
  const { authorization } = req.headers;
  const { homeTeam, awayTeam } = req.body;

  try {
    if (!authorization) next({ message: 'invalid token' });
    jwt.verify(authorization as string, secret);

    if (homeTeam === awayTeam) {
      res.status(401)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    next();
  } catch (err) {
    next(err);
  }
}
