import { Request, Response } from 'express';
import { User } from './users.model';

interface SignInRequestBody {
  email: string;
  password: string;
}

const getUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password }: SignInRequestBody = req.body;

  try {
    const user = await User.findOne({
      where: {
        email,
        password,
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
  getUser,
};
