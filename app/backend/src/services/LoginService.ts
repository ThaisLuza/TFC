import * as bcrypt from 'bcryptjs';
import User from '../database/models/UserModel';
import { IUser } from '../database/interfaces/index';

import generateJwt from '../utils/generateJwt';
import ErrorStatus from '../utils/errorStatus';

export default class LoginService {
  generateToken = async (user: IUser) => {
    const newUser = await User.findOne({
      where: { email: user.email },
    });

    if (!newUser) {
      throw new ErrorStatus(401, 'Incorrect email or password');
    }

    const validPass = await bcrypt.compare(user.password, newUser.password);

    if (!validPass) {
      throw new ErrorStatus(401, 'Incorrect email or password');
    }

    const tkn = generateJwt(newUser);
    return tkn;
  };
}
