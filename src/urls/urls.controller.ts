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

const updateCustomLink = async (req: Request, res: Response) => {
  const id = req.user?.id;
  const { urlLinkToUpdate, customLink } = req.body;

  if (!customLink) {
    res.status(400).json({
      ok: false,
      status: 400,
      message: 'Custom link must have a value',
    });
  }

  try {
    const linkToUpdate = await Urls.findOne({
      where: {
        original: urlLinkToUpdate,
      },
    });

    if (!linkToUpdate) {
      res.status(404).json({
        ok: false,
        status: 404,
        message: "Link dosn't exist",
      });
      return;
    }

    if (linkToUpdate.dataValues.userId !== id) {
      res.status(403).json({
        ok: false,
        status: 403,
        message: 'You are not allowed to update this link',
      });
      return;
    }

    if (linkToUpdate.dataValues.customLink === customLink) {
      res.status(400).json({
        ok: false,
        status: 400,
        message: 'Custom link already have that value',
      });
      return;
    }

    const updateCustomLink = await Urls.update(
      {
        customLink,
      },
      {
        where: {
          customLink: linkToUpdate.dataValues.customLink,
        },
      }
    );

    if (updateCustomLink[0] !== 1) {
      res.status(404).json({
        ok: false,
        status: 404,
        message: "Can't update the link",
      });
      return;
    }

    const linkWithNewCustomLink = await Urls.findOne({
      where: {
        original: urlLinkToUpdate,
      },
    });

    res.status(201).json({
      ok: true,
      status: 201,
      user: {
        id: req.user?.id,
        username: req.user?.username,
        email: req.user?.email,
        token: req.user?.refreshToken,
      },
      data: {
        id: linkWithNewCustomLink?.dataValues.id,
        originalUrl: linkWithNewCustomLink?.dataValues.original,
        shortUrl: linkWithNewCustomLink?.dataValues.short,
        customLink: linkWithNewCustomLink?.dataValues.customLink,
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
  updateCustomLink,
};
