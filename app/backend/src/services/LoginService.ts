import * as bcrypt from 'bcryptjs';
import User from '../database/models/UserModel';
import { IUser } from '../database/interfaces/index';

import generateJwt from '../utils/generateJwt';
import ErrorStatus from '../utils/errorStatus';

export default class LoginService {
  generateToken = async (user: IUser) => {
    const newLog = await User.findOne({
      where: { email: user.email },
    });

    if (!newLog) {
      throw new ErrorStatus(401, 'Incorrect email or password');
    }

    const validPass = await bcrypt.compare(user.password, newLog.password);

    if (!validPass) {
      throw new ErrorStatus(401, 'Incorrect email or password');
    }

    const tkn = generateJwt(newLog);
    return tkn;
  };
}
