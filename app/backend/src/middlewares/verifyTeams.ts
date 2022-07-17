// import { NextFunction, Request, Response } from 'express';
// import MatchesService from '../services/MatchesService';

// async function verifyTeams(req: Request, res: Response, next: NextFunction) {
//   const { homeTeam, awayTeam } = req.body;
//   try {
//     const verify = await MatchesService.getTeams(homeTeam, awayTeam);
//     if (!verify) {
//       return res.status(404).json({ message: 'There is no team with such id!' });
//     }

//     console.log(verify);
//     next();
//   } catch (err) {
//     next(err);
//   }
// }

// export default verifyTeams;
