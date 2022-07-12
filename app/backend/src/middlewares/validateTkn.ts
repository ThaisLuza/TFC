import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import ErrorStatus from '../utils/errorStatus';
import { IAuth } from '../database/interfaces/index';

const jwtSecret = process.env.JWT_SECRET || 'mysecret';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new ErrorStatus(401, 'Token not found');
    }

    const decoded = jwt.verify(authorization, jwtSecret);

    const { user } = decoded as IAuth;

    res.status(200).json({ role: user.role });
  } catch (err) {
    next(err);
  }
};

export default verifyToken;
