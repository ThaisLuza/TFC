import { DataTypes, Model } from "sequelize";
import db from ".";

class Teams extends Model {
  public id!: number;
}

Teams.init({
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  team_name: {
    type: DataTypes.STRING,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

export default Teams;