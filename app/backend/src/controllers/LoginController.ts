import { NextFunction, Request, Response } from 'express';
import { IJwt, IUserService } from '../database/interfaces';

export default class LoginController {
  constructor(private service: IUserService) {
    this.service = service;
  }

  login = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { email, password } = req.body;

      const token = await this.service.login({ email, password });

      res.status(200).json({ token });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  validateLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { authorization } = req.headers;
      const token = authorization as string;
      const { role } = this.service.validateLogin(token) as IJwt;
      return res.status(200).json({ role });
    } catch (error) {
      next(error);
    }
  }
}
