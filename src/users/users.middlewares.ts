import { Request, Response, NextFunction } from 'express';
import { userUtilities } from './users.utilities';
import type { SignInRequestBody } from './types';

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

export const userMiddlewares = {
  signInInputsValidations,
};
