import { Optional, Model } from 'sequelize';

interface UserAttributes {
  id: number;
  username: string;
  password: string;
  email: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {}

export interface SignInRequestBody {
  email: string;
  password: string;
}

export interface SignUpRequestBody extends SignInRequestBody {
  username: string;
  repeatPassword: string;
}
