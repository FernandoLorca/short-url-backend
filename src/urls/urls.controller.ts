import { Request, Response } from 'express';
import { Urls } from './urls.model';

const storageUrlDatabase = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const urls = req.urls;
  const customLink = req.body.customLink;

  try {
    const storageDatabase = await Urls.create({
      original: urls?.url,
      short: `${process.env.DOMAIN}${urls?.shortLink}`,
      hash: urls?.hash,
      userId,
      customLink,
    });

    res.status(201).json({
      ok: true,
      status: 201,
      data: {
        id: storageDatabase.dataValues.id,
        originalUrl: storageDatabase.dataValues.original,
        shortUrl: storageDatabase.dataValues.short,
        customLink: storageDatabase.dataValues.customLink,
      },
    });
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

export const urlsController = {
  storageUrlDatabase,
};
