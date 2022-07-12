import * as express from 'express';
import { validatePassword, validateEmail } from '../middlewares/validateLogin';
import LoginController from '../controllers/LoginController';
import TeamsController from '../controllers/TeamsController';
import verifyToken from '../middlewares/validateTkn';

const router = express.Router();

const controllerLogin = new LoginController();
const controllerTeams = new TeamsController();

router.post(
  '/login',
  validateEmail,
  validatePassword,
  controllerLogin.createToken,
);

router.get('login/validate', verifyToken);

router.get('/teams', controllerTeams.getAll);

export default router;
