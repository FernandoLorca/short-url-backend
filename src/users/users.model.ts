import { DataTypes } from 'sequelize';
import { sequelize } from '../database/connection';
import { Urls } from '../urls/urls.model';
import { UserInstance } from './types';

export const User = sequelize.define<UserInstance>('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(18),
    allowNull: false,
  },
});

User.hasMany(Urls, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
  sourceKey: 'id',
});

Urls.belongsTo(User, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
  targetKey: 'id',
});
