import { NextFunction, Request, Response } from 'express';
import LoginService from '../services/LoginService';

export default class LoginController {
  constructor(private service:LoginService) {}

  login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, password } = req.body;

      const token = await this.service.login(email, password);

      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  };
}
