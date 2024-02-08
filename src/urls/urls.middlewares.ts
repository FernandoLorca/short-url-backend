import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
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
  interface Request {
    urls?: {
      url: string;
      hash: string;
      shortLink: string;
    };
  }
}

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
      res.status(500).json({
        ok: false,
        status: 500,
        message: `Internal server error: ${error.message}`,
      });
      return;
    }
  }
};

const urlsValidation = (req: Request, res: Response, next: NextFunction) => {
  const { url } = req.body;

  if (!url) {
    res.status(404).json({
      ok: false,
      status: 404,
      message: "Urls dosn't exist",
    });
    return;
  }

  try {
    const isValidUrl = new URL(url);

    if (isValidUrl.protocol !== 'https:' && isValidUrl.protocol !== 'http:') {
      res.status(400).json({
        ok: false,
        status: 400,
        message: 'Protocol https/http is incorrect',
      });
      return;
    }

    next();
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      res.status(500).json({
        ok: false,
        status: 500,
        message: `Internal server error: ${error.message}`,
      });
    }
  }
};

const hashUrl = async (req: Request, _: Response, next: NextFunction) => {
  const url = req.body.url;
  const characterLimit = 20;
  const hashUrl = await bcrypt.hash(url, 5);
  const shortHashUrl = hashUrl.slice(10, characterLimit);

  const letterGenerator = () => {
    const genNum = Math.floor(Math.random() * 26);
    const offset = Math.random() < 0.5 ? 65 : 97;

    return String.fromCharCode(genNum + offset);
  };

  const replaceHashCharacter = shortHashUrl.split('').map(character => {
    if (character !== '.' && character !== '/') {
      return character;
    } else {
      return letterGenerator();
    }
  });
  const finalHash = replaceHashCharacter.join('');

  req.urls = {
    url,
    hash: hashUrl,
    shortLink: finalHash,
  };

  next();
};

export const urlsMiddlewares = {
  verifyToken,
  refreshToken,
  urlsValidation,
  hashUrl,
};
