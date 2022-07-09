import * as bcrypt from 'bcryptjs';
import { IUser } from '../database/interfaces/index';
import User from '../database/models/UserModel';
import generateJWT from '../utils/jwt';
import ErrorStatus from '../utils/errorStatus';

class LoginService {
  private model = User;

  public async login(emailReq: string, password: string): Promise<string> {
    const foundUser = (await this.model.findOne({
      where: { email: emailReq },
    })) as IUser;

    if (!foundUser) throw new ErrorStatus(401, 'Incorrect email or password');

    const validUser = await bcrypt.compare(password, foundUser.password);

    if (!validUser) throw new ErrorStatus(401, 'Incorrect email or password');

    const { id, email, username, role } = foundUser;

    const token = generateJWT({ id, email, username, role });

    return token;
  }
}

export default LoginService;
