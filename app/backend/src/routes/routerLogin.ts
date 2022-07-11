import * as express from 'express';
import LoginService from '../services/LoginService';
import LoginController from '../controllers/LoginController';
import validateLogin from '../middlewares/validateLogin';

const entityFactory = () => {
  const service = new LoginService();
  const controller = new LoginController(service);
  return controller;
};

const routerLogin = express.Router();

const controllerLogin = entityFactory();

routerLogin.post('/', validateLogin, (req, res, next) => {
  controllerLogin.login(req, res, next);
});

routerLogin.get('/validate', (req, res, next)=>{
  controllerLogin.
})

export default routerLogin;
