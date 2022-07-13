import { NextFunction, Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  getAll = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const match = await MatchesService.getAll();
      return res.status(200).json(match);
    } catch (err) {
      next(err);
    }
  };
}
