import { Request } from 'express';
import { Optional, Model } from 'sequelize';

interface UsersAttributes {
  id: number;
  username: string;
  password: string;
  email: string;
}

interface UsersCreationAttributes extends Optional<UsersAttributes, 'id'> {}

export interface UserInstance
  extends Model<UsersAttributes, UsersCreationAttributes>,
    UsersAttributes {}

export interface SignInRequestBody {
  email: string;
  password: string;
}

export interface SignUpRequestBody extends SignInRequestBody {
  username: string;
  repeatPassword: string;
}

export interface UsersInstance
  extends Model<UsersAttributes, UsersCreationAttributes>,
    UsersAttributes {}

interface RequestUser {
  id: number;
  username: string;
  password?: string;
  email: string;
}

export interface AuthenticatedRequest extends Request {
  user?: RequestUser;
}
