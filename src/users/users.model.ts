import { DataTypes } from 'sequelize';
import { sequelize } from '../database/connection';
import { UserInstance } from './types';

export const User = sequelize.define<UserInstance>('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING(),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(),
    allowNull: false,
    unique: true,
  },
});
