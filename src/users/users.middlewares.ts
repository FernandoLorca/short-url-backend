import { Request, Response, NextFunction } from 'express';
import bcryptjs from 'bcryptjs';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { User } from './users.model';
import { userUtilities } from './users.utilities';
import type { SignInRequestBody, SignUpRequestBody } from './types';

interface TokenInfo {
  decoded: JwtPayload;
  token: string;
  tokenExpired: boolean;
}

declare module 'express-serve-static-core' {
  interface Request {
    token?: TokenInfo;
    user?: {
      id: number;
      email: string;
      username: string;
      password?: string;
      refreshToken?: string;
    };
  }
}

const JSONValidation = (
  req: Request,
  res: Response,
  next: NextFunction
): boolean | undefined => {
  const bodyKeys = Object.keys(req.body);

  const JSONValidation = (reqBody: string[]): boolean => {
    if (
      (reqBody.length === 2 &&
        reqBody.includes('email') &&
        reqBody.includes('password')) ||
      (reqBody.length === 4 &&
        reqBody.includes('username') &&
        reqBody.includes('email') &&
        reqBody.includes('password') &&
        reqBody.includes('repeatPassword'))
    ) {
      return true;
    }

    return false;
  };

  if (!JSONValidation(bodyKeys)) {
    res.status(400).json({
      ok: false,
      status: 400,
      message: 'Invalid JSON',
    });
    return;
  }

  next();
};

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
    console.error(error);
    res.status(500).json({
      ok: false,
      status: 500,
      message: `Internal server error: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`,
    });
  }
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
    const passwordMatch = await bcryptjs.compare(password, user.password);

    if (!passwordMatch) {
      res.status(400).json({
        ok: false,
        status: 400,
        message: 'Incorrect password',
      });
      return;
    }

    (req as Request).user = {
      id: user.dataValues.id,
      email: user.dataValues.email,
      username: user.dataValues.username,
      password: user.dataValues.password,
    };

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      status: 500,
      message: `Internal server error: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`,
    });
  }
};

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const bearerHeader = req.headers.authorization;

  if (!bearerHeader) {
    res.status(401).json({
      ok: false,
      status: 401,
      message: 'Token is required',
    });
    return;
  }

  try {
    const token = bearerHeader.split(' ')[1];

    if (token === undefined) {
      res.status(400).json({
        ok: false,
        status: 400,
        message: 'Jwt must be provided',
      });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as Secret, {
      ignoreExpiration: true,
    }) as JwtPayload;
    let tokenExpired = false;

    if (decoded && typeof decoded === 'object' && decoded.exp !== undefined) {
      const expirationTimestamp = decoded.exp * 1000;
      const currentTimestamp = Date.now();

      if (expirationTimestamp < currentTimestamp) {
        tokenExpired = true;
        res.status(401).json({
          ok: false,
          status: 401,
          message: 'Token expired',
        });
      }
    }

    req.token = {
      decoded,
      token,
      tokenExpired,
    };

    next();
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return res.status(500).json({
        ok: false,
        status: 500,
        message: `Internal server error: ${error.message}`,
      });
    }
  }
};

const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tokenExpired = req.token?.tokenExpired;
  if (tokenExpired) return;

  try {
    const decoded = req.token?.decoded;
    const user = await User.findOne({
      where: {
        id: decoded?.id,
        email: decoded?.email,
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
    const refreshToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET as Secret,
      {
        expiresIn: '24h',
      }
    );

    (req as Request).user = {
      id: user.id,
      email: user.email,
      username: user.username,
      refreshToken,
    };

    next();
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      res.status(500).json({
        ok: false,
        status: 500,
        message: `Internal server error: ${error.message}`,
      });
      return;
    }
  }
};

export const userMiddlewares = {
  JSONValidation,
  signUpInputsValidations,
  signUpVerificationByEmail,
  signInInputsValidations,
  signInVerificationByEmail,
  verifyToken,
  refreshToken,
};
