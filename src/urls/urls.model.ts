import { DataTypes } from 'sequelize';
import { sequelize } from '../database/connection';
import { UrlsInstance } from './types';

export const Urls = sequelize.define<UrlsInstance>('Urls', {
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
