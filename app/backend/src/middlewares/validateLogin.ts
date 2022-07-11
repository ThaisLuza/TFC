import { NextFunction, Request, Response } from 'express';
import ErrorStatus from '../utils/errorStatus';

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) { return next(new ErrorStatus(400, 'All fields must be filled')); }
};

export default validateLogin;
