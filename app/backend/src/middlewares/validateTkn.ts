import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { IAuth } from '../database/interfaces';
import ErrorStatus from '../utils/errorStatus';

const jwtSecret = process.env.JWT_SECRET || 'jwt_secret';

export default function verifyToken(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new ErrorStatus(401, 'Token not found');
  }
  try {
    const decoded = jwt.verify(authorization, jwtSecret);
    console.log(decoded);
    const { user } = decoded as IAuth;
    const { role } = user;
    console.log(role);
    return res.status(200).json({ role });
  } catch (err) {
    next(err);
  }
}
