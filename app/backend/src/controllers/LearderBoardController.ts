import { NextFunction, Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderBoardService';

export default class LeaderBoardController {
  getLeaderBoard = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const team = await LeaderBoardService.getMatches();
      return res.status(200).json(team);
    } catch (err) {
      next(err);
    }
  };
}
