import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { User } from '../users/users.model';

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
      refreshToken: string;
    };
  }
}

const verifyTokenExpiration = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
      return res.status(401).json({
        ok: false,
        status: 401,
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

    req.user = {
      id: user.id,
      email: user.email,
      username: user.username,
      refreshToken,
    };

    next();
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      res.status(401).json({
        ok: false,
        status: 401,
        message: `Internal server error: ${error.message}`,
      });
      return;
    }
  }
};

export const urlsMiddlewares = {
  verifyTokenExpiration,
  refreshToken,
};
