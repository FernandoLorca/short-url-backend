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
    type: DataTypes.STRING(),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(),
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
