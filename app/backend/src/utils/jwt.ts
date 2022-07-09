import 'dotenv/config';
import { SignOptions, sign } from 'jsonwebtoken';
import IUser from '../database/interfaces/IUser';

const senhasecreta = process.env.JWT_SECRET;

const jwtConfig: SignOptions = {
  expiresIn: '15d',
  algorithm: 'HS256',
};

const generateJWT = (payload: Omit<IUser, 'password'>) => {
  const token = sign({ data: payload }, senhasecreta as string, jwtConfig);

  return token;
};

export default generateJWT;
