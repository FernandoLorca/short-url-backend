import { Request, Response, NextFunction } from 'express';
import bcryptjs from 'bcryptjs';
import { User } from './users.model';
import { userUtilities } from './users.utilities';
import type {
  SignInRequestBody,
  SignUpRequestBody,
  UsersInstance,
} from './types';

interface CustomRequest extends Request {
  user?: {
    user: UsersInstance;
  };
}

const signUpInputsValidations = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { username, email, password, repeatPassword }: SignUpRequestBody =
    req.body;

  if (!username || !email || !password || !repeatPassword) {
    res.status(400).json({
      ok: false,
      status: 400,
      message: 'All fields are required',
    });
    return;
  }

  if (!userUtilities.emailFormatValidation(email)) {
    res.status(400).json({
      ok: false,
      status: 400,
      message: 'Invalid email',
    });
    return;
  }

  if (!userUtilities.passwordFormatValidation(password)) {
    res.status(400).json({
      ok: false,
      status: 400,
      message: 'Password must be between 6 and 24 characters',
    });
    return;
  }

  if (password !== repeatPassword) {
    res.status(400).json({
      ok: false,
      status: 400,
      message: 'Passwords do not match',
    });
    return;
  }

  next();
};

const signUpVerificationByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email }: { email: string } = req.body;

  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (user !== null) {
      res.status(400).json({
        ok: false,
        status: 400,
        message: 'Email already exists',
      });
      return;
    }

    next();
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: `Internal server error: ${error}`,
    });
  }
};

const signInJSONValidation = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const bodyKeys = Object.keys(req.body);

  if (!userUtilities.JSONValidation(bodyKeys)) {
    res.status(400).json({
      ok: false,
      status: 400,
      message: 'Invalid JSON',
    });
  }

  next();
};

const signInInputsValidations = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { email, password }: SignInRequestBody = req.body;

  if (!email || !password) {
    res.status(400).json({
      ok: false,
      status: 400,
      message: 'Email and password are required',
    });
    return;
  }

  if (!userUtilities.emailFormatValidation(email)) {
    res.status(400).json({
      ok: false,
      status: 400,
      message: 'Invalid email',
    });
    return;
  }

  next();
};

const signInVerificationByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password }: { email: string; password: string } = req.body;

  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (user === null) {
      res.status(404).json({
        ok: false,
        status: 404,
        message: 'User not found',
      });
      return;
    }

    try {
      const passwordMatch = await bcryptjs.compare(password, user.password);

      if (!passwordMatch) {
        res.status(400).json({
          ok: false,
          status: 400,
          message: 'Incorrect password',
        });
        return;
      }

      (req as CustomRequest).user = {
        user,
      };
    } catch (error) {
      res.status(500).json({
        ok: false,
        status: 500,
        message: `Internal server error: ${error}`,
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: `Internal server error: ${error}`,
    });
  }
};

export const userMiddlewares = {
  signInJSONValidation,
  signUpInputsValidations,
  signUpVerificationByEmail,
  signInInputsValidations,
  signInVerificationByEmail,
};
