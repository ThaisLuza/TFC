import { NextFunction, Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  getAll = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
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

  saveMatches = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      // const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = req.body;
      // const data = { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress };

      const newMatch = await MatchesService.saveMatches(req.body);
      return res.status(201).json(newMatch);
    } catch (err) {
      next(err);
    }
  };

  updateMatches = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const updatedMatch = await MatchesService.updateMatch(id);
      return res.status(200).json(updatedMatch);
    } catch (err) {
      next(err);
    }
  };
}
