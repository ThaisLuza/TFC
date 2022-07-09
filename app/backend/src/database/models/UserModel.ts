import { DataTypes, Model } from 'sequelize';
import db from '.';

class User extends Model {
  public id: number;
  public username: string;
  public role: string;
  public email: string;
  public password: string;
}

User.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    username: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'users',
    timestamps: false,
  },
);

export default User;
