import { DataTypes, Model } from 'sequelize';
import db from '.';
import Teams from './TeamsModel';

class Matches extends Model {
  public id!: number;
}

Matches.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    home_team: {
      type: DataTypes.INTEGER,
    },
    home_team_goals: {
      type: DataTypes.INTEGER,
    },
    away_team: {
      type: DataTypes.INTEGER,
    },
    away_team_goals: {
      type: DataTypes.INTEGER,
    },
    in_progress: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'matches',
    timestamps: false,
  }
);

Matches.hasOne(Teams, { foreignKey: 'homeTeam', as: 'teams_home' });
Matches.hasOne(Teams, { foreignKey: 'awayTeam', as: 'teams_away' });

export default Matches;
