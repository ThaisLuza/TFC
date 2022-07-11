import * as jwt from 'jsonwebtoken';
import { IUser } from '../database/interfaces';

const jwtSecret = process.env.JWT_SECRET || 'mysecret';

const token = (user: IUser) => {
  const generateToken = jwt.sign({ user }, jwtSecret, {
    expiresIn: '15d',
    algorithm: 'HS256',
  });
  return generateToken;
};

export default token;
