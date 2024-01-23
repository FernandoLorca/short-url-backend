import { Optional, Model } from 'sequelize';

interface UrlsAttributes {
  id: number;
  original: string;
  short: string;
  hash: string;
  customLink: string;
}

interface UserCreationAttributes extends Optional<UrlsAttributes, 'id'> {}

export interface UrlsInstance
  extends Model<UrlsAttributes, UrlsCreationAttributes>,
    UserAttributes {}
