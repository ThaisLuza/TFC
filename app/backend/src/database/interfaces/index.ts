export interface ILogin {
  email: string;
  password: string;
}

export interface IUser extends ILogin {
  id?: number;
  username: string;
  role: string;
}

export interface IDecode {
  user: {
    id: number,
    username: string,
    role: string,
    email: string,
    iat: number,
    exp: number
  }
}
