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
    role: 'admin' | 'user'
    email: string;
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
