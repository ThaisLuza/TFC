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

Teams.hasMany(Matches, { foreignKey: 'homeTeam', as: 'teamHome' });
Teams.hasMany(Matches, { foreignKey: 'awayTeam', as: 'teamAway' });

Matches.belongsTo(Teams, { foreignKey: 'homeTeam', as: 'teamHome' });
Matches.belongsTo(Teams, { foreignKey: 'awayTeam', as: 'teamAway' });

export default Matches;
