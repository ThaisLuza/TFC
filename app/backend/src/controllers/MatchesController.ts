import { NextFunction, Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  getAll = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { inProgress } = req.query;
      if (!inProgress) {
        const match = await MatchesService.getAll();
        return res.status(200).json(match);
      }
      const progress = inProgress === 'true';
      const match = await MatchesService.getInProgress(progress);
      return res.status(200).json(match);
    } catch (err) {
      next(err);
    }
  };
}
