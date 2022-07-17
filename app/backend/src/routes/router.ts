import * as express from 'express';
import { validatePassword, validateEmail } from '../middlewares/validateLogin';
import LoginController from '../controllers/LoginController';
import TeamsController from '../controllers/TeamsController';
import verifyToken from '../middlewares/validateTkn';
import MatchesController from '../controllers/MatchesController';
import { validateMatch, verifyTeams } from '../middlewares/validateMatch';

const router = express.Router();

const controllerLogin = new LoginController();
const controllerTeams = new TeamsController();
const controllerMatch = new MatchesController();

router.post(
  '/login',
  validateEmail,
  validatePassword,
  controllerLogin.createToken,
);

router.get('/login/validate', verifyToken);

router.get('/teams/:id', controllerTeams.getById);

router.get('/teams', controllerTeams.getAll);

router.get('/matches', controllerMatch.getAll);

router.post('/matches', validateMatch, verifyTeams, controllerMatch.saveMatches);

router.patch('/matches/:id/finish', controllerMatch.updateMatches);

export default router;
