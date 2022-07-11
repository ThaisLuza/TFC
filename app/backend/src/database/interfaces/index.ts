import { JwtPayload } from 'jsonwebtoken';

export interface ILogin {
  email: string;
  password: string;
}

export interface IUser extends ILogin {
  id?: number;
  username: string;
  role: string;
}

export interface IUserModel {
  login(email: string): Promise<IUser | null>;
}

export interface IUserService {
  login(user: ILogin): Promise<string | null>;
  validateLogin(token: string): string | JwtPayload;
}

export interface IJwt extends JwtPayload {
  id: number;
  role: string;
}
