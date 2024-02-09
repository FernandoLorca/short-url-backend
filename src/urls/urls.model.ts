import { DataTypes } from 'sequelize';
import { sequelize } from '../database/connection';
import { User } from '../users/users.model';
import { UrlsInstance } from './types';

export const Urls = sequelize.define<UrlsInstance>('urls', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  original: {
    type: DataTypes.STRING(),
    allowNull: false,
  },
  short: {
    type: DataTypes.STRING(),
    allowNull: false,
  },
  hash: {
    type: DataTypes.STRING(),
    allowNull: false,
  },
  customLink: {
    type: DataTypes.STRING(),
    allowNull: true,
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
