import { NextFunction, Request, Response } from 'express';
import LoginService from '../services/LoginService';
import { IUser } from '../database/interfaces';

export default class LoginController {
  public login: LoginService;

  constructor() {
    this.login = new LoginService();
  }

  public createToken = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const user: IUser = req.body;
      const token = await this.login.generateToken(user);
      res.status(200).json({ token });
    } catch (err) {
      next(err);
    }
  };
}
