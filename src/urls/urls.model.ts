import { DataTypes } from 'sequelize';
import { sequelize } from '../database/connection';
import { User } from '../users/users.model';
import { UrlsInstance, UrlsAttributes } from './types';

export const Urls = sequelize.define<UrlsInstance, UrlsAttributes>(
  'urls',
  {
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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: true,
  }
);

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
