import { Router } from 'express';
import LoginService from '../services/LoginService';
import LoginController from '../controllers/LoginController';
// import validateLogin

const router = Router();

const service = new LoginService();
const controller = new LoginController(service);

router.post('/login', controller.login);

export default router;
