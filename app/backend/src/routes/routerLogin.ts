import * as express from 'express';
import { validatePassword, validateEmail } from '../middlewares/validateLogin';
import LoginController from '../controllers/LoginController';
import verifyToken from '../middlewares/validateTkn';

const routerLogin = express.Router();

const controllerLogin = new LoginController();

routerLogin.post(
  '/login',
  validateEmail,
  validatePassword,
  controllerLogin.createToken,
);

routerLogin.get('login/validate', verifyToken);

export default routerLogin;
