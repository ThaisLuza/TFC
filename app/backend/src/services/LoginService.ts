import { ILogin, IUserModel, IUserService } from '../database/interfaces/index';

import Jwt from '../utils/Jwt';
import ErrorStatus from '../utils/errorStatus';

export default class LoginService implements IUserService {
  jwtCode = new Jwt();
  constructor(private model: IUserModel) {
    this.model = model;
  }

  async login(user: ILogin): Promise<string> {
    const findUser = await this.model.login(user.email);

    if (!findUser) {
      throw new ErrorStatus(401, 'Incorrect email or password');
    }

    const { id, role } = findUser;

    const token = this.jwtCode.generateJWT({ id, role });

    return token;
  }

  validateLogin(token: string) {
    const decoded = this.jwtCode.validateToken(token);
    return decoded;
  }
}
