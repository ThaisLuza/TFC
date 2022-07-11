import 'dotenv/config';
import * as jwt from 'jsonwebtoken';
// import { IUser } from '../database/interfaces';

export default class GenerateJWT {
  private config: jwt.SignOptions = {
    expiresIn: '15d',
    algorithm: 'HS256',
  };

  senhasecreta = process.env.JWT_SECRET;

  generateJWT = (payload: jwt.JwtPayload): string => {
    const token = jwt.sign(
      { data: payload },
      this.senhasecreta as string,
      this.config,
    );

    return token;
  };

  validateToken(token: string) {
    const decoded = jwt.verify(token, this.senhasecreta as jwt.Secret);
    return decoded;
  }
}
