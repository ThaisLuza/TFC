import { Response, NextFunction, Request } from 'express';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

const secret = process.env.JWT_SECRET || 'jwt_secret';

export default function validateMatch(req: Request, res:Response, next:NextFunction) {
  const { authorization } = req.headers;
  if (!authorization) next({ message: 'invalid token' });
  try {
    jwt.verify(authorization as string, secret);
    next();
  } catch (error) {
    next({ message: 'invalid token' });
  }
}
