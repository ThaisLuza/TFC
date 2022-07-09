import { DataTypes, Model } from 'sequelize';
import db from '.';
import Teams from './TeamsModel';

class Matches extends Model {
  public id!: number;
  public homeTeam: number;
  public homeTeamGoals: number;
  public awayTeam: number;
  public awayTeamGoals: number;
  public inProgress: boolean;
}

Matches.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    homeTeam: {
      type: DataTypes.INTEGER,
    },
    homeTeamGoals: {
      type: DataTypes.INTEGER,
    },
    awayTeam: {
      type: DataTypes.INTEGER,
    },
    awayTeamGoals: {
      type: DataTypes.INTEGER,
    },
    inProgress: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'matches',
    timestamps: false,
  },
);

Matches.hasOne(Teams, { foreignKey: 'homeTeam', as: 'teams_home' });
Matches.hasOne(Teams, { foreignKey: 'awayTeam', as: 'teams_away' });

export default Matches;
