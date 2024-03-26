import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { Urls } from './urls.model';
import { User } from '../users/users.model';

declare module 'express-serve-static-core' {
  interface Request {
    urls?: {
      url: string;
      hash: string;
      shortLink: string;
    };
  }
}

const JSONValidation = (req: Request, res: Response, next: NextFunction) => {
  const bodyKeys = Object.keys(req.body);
  const bodyValues = Object.values(req.body);

  const JSONValidator = (
    bodyKeys: string[],
    bodyValues: unknown[] | string[] | number[]
  ): boolean => {
    if (
      (bodyKeys.length === 1 &&
        bodyKeys.includes('url') &&
        typeof bodyValues[0] === 'string') ||
      (bodyKeys.length === 1 &&
        bodyKeys.includes('id') &&
        typeof bodyValues[0] === 'number') ||
      (bodyKeys.length === 2 &&
        bodyKeys.includes('url') &&
        typeof bodyValues[0] === 'string' &&
        bodyKeys.includes('customLink')) ||
      (typeof bodyValues[1] === 'string' &&
        bodyKeys.includes('customLink') &&
        typeof bodyValues[1] === null) ||
      (bodyKeys.length === 2 &&
        bodyKeys.includes('urlId') &&
        typeof bodyValues[0] === 'number' &&
        bodyKeys.includes('customLink') &&
        typeof bodyValues[1] === 'string')
    ) {
      return true;
    }

    return false;
  };

  if (!JSONValidator(bodyKeys, bodyValues)) {
    res.status(400).json({
      ok: false,
      status: 400,
      message: 'Invalid JSON',
    });
    return;
  }

  next();
};

const urlsValidation = (req: Request, res: Response, next: NextFunction) => {
  const { url }: { url: string } = req.body;

  if (!url) {
    res.status(400).json({
      ok: false,
      status: 400,
      message: "Urls dosn't exist",
    });
    return;
  }

  let urlWithSlash = url;

  if (!url.endsWith('/')) {
    urlWithSlash = `${url}/`;
  }

  const urlRegex = /^(http:\/\/|https:\/\/)/;
  const validateURL = (url: string) => urlRegex.test(url);

  if (!validateURL(urlWithSlash)) {
    res.status(400).json({
      ok: false,
      status: 400,
      message: 'Invalid URL',
    });
    return;
  }

  try {
    const isValidUrl = new URL(urlWithSlash);

    if (isValidUrl.protocol !== 'https:' && isValidUrl.protocol !== 'http:') {
      res.status(400).json({
        ok: false,
        status: 400,
        message: 'Protocol https/http is incorrect',
      });
      return;
    }

    req.body.url = urlWithSlash;

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

const hashUrl = async (req: Request, res: Response, next: NextFunction) => {
  const url: string = req.body.url;
  const characterLimit = 20;

  try {
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

    (req as Request).urls = {
      url,
      hash: hashUrl,
      shortLink: finalHash,
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
    }
  }
};

const customLinkValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const customLink = req.body.customLink;

  try {
    const decoded = req.token?.decoded;
    const user = await User.findOne({
      where: {
        id: decoded?.id,
        email: decoded?.email,
      },
    });

    const userUrls = await Urls.findAll({
      where: {
        userId: user?.id,
      },
    });

    for (let i = 0; i < userUrls.length; i++) {
      if (
        userUrls[i].dataValues.customLink !== null &&
        userUrls[i].dataValues.customLink === customLink
      ) {
        res.status(400).json({
          ok: false,
          status: 400,
          message: 'Custom link already exists',
        });
        return;
      }
    }

    req.body.customLink = customLink;

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

export const urlsMiddlewares = {
  JSONValidation,
  urlsValidation,
  hashUrl,
  customLinkValidation,
};
