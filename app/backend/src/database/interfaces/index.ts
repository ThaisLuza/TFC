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
    password: string;
    iat: number;
    exp: number;
  };
}

export interface ITeam {
  id: number;
  teamName: string;
}

export interface IMatch {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals?: number;
  inProgress?: boolean;
  teamHome?: {
    teamName?: string;
  };
  teamAway?: {
    teamName?: string;
  };
}

export interface ISaveMatch {
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress: boolean;
}
