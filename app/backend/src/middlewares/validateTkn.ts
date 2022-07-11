import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import ErrorStatus from '../utils/errorStatus';
import { IDecode } from '../database/interfaces/index';

const jwtSecret = process.env.JWT_SECRET || 'mysecret';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new ErrorStatus(401, 'Token not found');
    }

    const decoded = jwt.verify(authorization, jwtSecret);
    console.log(decoded, 'decoded');

    const { user } = decoded as IDecode;

    res.status(200).json({ role: user.role });
    console.log({ role: user.role }, 'role: alguma coisa');
  } catch (err) {
    next(err);
  }
};

export default verifyToken;
