import { NextFunction, Request, Response } from 'express';
import TeamsService from '../services/TeamsService';

export default class TeamsController {
  getAll = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const teams = await TeamsService.getAll();
      return res.status(200).json(teams);
    } catch (err) {
      next(err);
    }
  };
}
