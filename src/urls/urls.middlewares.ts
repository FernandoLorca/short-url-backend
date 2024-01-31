import { Request, Response, NextFunction } from 'express';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

interface CustomRequest extends Request {
  token: string | JwtPayload;
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const bearerHeader = req.headers.authorization;

  if (!bearerHeader) {
    return res.status(401).json({
      ok: false,
      status: 401,
      message: 'Token is required',
    });
  }

  try {
    const token = bearerHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET as Secret, {
      ignoreExpiration: true,
    });

    if (decoded && typeof decoded === 'object' && decoded.exp !== undefined) {
      const expirationTimestamp = decoded.exp * 1000;
      const currentTimestamp = Date.now();

      if (expirationTimestamp < currentTimestamp) {
        return res.status(401).json({
          ok: false,
          status: 401,
          message: 'Token expired',
        });
      }
    }
    (req as CustomRequest).token = decoded;

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

export const urlsMiddlewares = {
  verifyToken,
};
