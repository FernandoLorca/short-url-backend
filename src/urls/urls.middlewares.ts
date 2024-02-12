import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';

declare module 'express-serve-static-core' {
  interface Request {
    urls?: {
      url: string;
      hash: string;
      shortLink: string;
    };
  }
}

const urlsValidation = (req: Request, res: Response, next: NextFunction) => {
  const { url }: { url: string } = req.body;

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
  const url: string = req.body.url;
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

  (req as Request).urls = {
    url,
    hash: hashUrl,
    shortLink: finalHash,
  };

  console.log('req.url');
  console.log(req.urls);

  next();
};

export const urlsMiddlewares = {
  urlsValidation,
  hashUrl,
};
