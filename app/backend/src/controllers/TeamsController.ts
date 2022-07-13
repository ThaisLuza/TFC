import { NextFunction, Request, Response } from 'express';
import TeamsService from '../services/TeamsService';

export default class TeamsController {
  getById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { id } = req.params;
      const team = await TeamsService.getById(Number(id));
      return res.status(200).json(team);
    } catch (err) {
      next(err);
    }
  };

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
