export interface ILogin {
  email: string;
  password: string;
}

export interface IUser extends ILogin {
  id?: number;
  username: string;
  role: string;
}

export interface IAuth {
  user: {
    id: number;
    username: string;
    role: string;
    email: string;
  };
}

export interface ITeam {
  id: number;
  teamName: string;
}
