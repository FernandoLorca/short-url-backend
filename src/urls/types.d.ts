import { Optional, Model } from 'sequelize';
import { JwtPayload } from 'jsonwebtoken';

interface UrlsAttributes {
  id: number;
  original: string | null;
  short: string;
  hash: string | null;
  customLink: string;
  userId: number | null;
  createdAt: Date;
  updatedAt: Date;
}

interface UrlsCreationAttributes extends Optional<UrlsAttributes, 'id'> {}

export interface UrlsInstance
  extends Model<UrlsAttributes, UrlsCreationAttributes>,
    UrlsAttributes {}
