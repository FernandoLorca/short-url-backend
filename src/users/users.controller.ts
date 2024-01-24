import { Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from './users.model';
import type { SignUpRequestBody, AuthenticatedRequest } from './types';

interface NewUser {
  dataValues: {
    id: number;
    username: string;
    password: string;
    email: string;
  };
}

const createUser = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password }: SignUpRequestBody = req.body;

  try {
    const hashPassword: string = await bcrypt.hash(password, 10);

    const newUser: NewUser = await User.create({
      username,
      email,
      password: hashPassword,
    });

    const generateToken: string = jwt.sign(
      {
        id: newUser.dataValues.id,
        email: newUser.dataValues.email,
      },
      process.env.JWT_SECRET as Secret,
      {
        expiresIn: '24h',
      }
    );

    res.status(201).json({
      ok: true,
      status: 201,
      message: 'User created',
      user: {
        id: newUser.dataValues.id,
        username: newUser.dataValues.username,
        email: newUser.dataValues.email,
        token: generateToken,
      },
    });
  } catch (error: unknown) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: `Internal server error: ${error}`,
    });
  }
};

const getUser = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const reqUser = req.user?.user.dataValues;
    const user = await User.findOne({
      where: {
        email: reqUser?.email,
        password: reqUser?.password,
      },
    });

    if (!user) {
      res.status(404).json({
        ok: false,
        status: 404,
        message: 'User not found',
      });
      return;
    }

    res.status(200).json({
      ok: true,
      status: 200,
      message: 'User found',
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: `Internal server error: ${error}`,
    });
  }
};

export const usersController = {
  createUser,
  getUser,
};
