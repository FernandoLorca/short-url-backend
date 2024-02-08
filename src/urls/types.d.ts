import { Optional, Model } from 'sequelize';
import { JwtPayload } from 'jsonwebtoken';

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
