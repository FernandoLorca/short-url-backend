import { Request, Response } from 'express';
import { Urls } from './urls.model';
import { User } from '../users/users.model';

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
      createdAt: new Date(),
      updatedAt: new Date(),
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

const getUserUrls = async (req: Request, res: Response) => {
  const user = req.user;

  try {
    const userUrls = await Urls.findAll({
      where: {
        userId: user?.id,
      },
    });

    if (userUrls.length === 0) {
      res.status(404).json({
        ok: false,
        status: 404,
        message: 'Found no link from this user.',
      });
      return;
    }

    const urlsFromUser = userUrls
      .map(url => {
        return {
          id: url.dataValues.id,
          original: url.dataValues.original,
          short: url.dataValues.short,
          customLink: url.dataValues.customLink,
          createdAt: url.dataValues.createdAt,
        };
      })
      .sort((a, b) => a.id - b.id);

    res.status(200).json({
      ok: true,
      status: 200,
      user: {
        id: req.user?.id,
        username: req.user?.username,
        email: req.user?.email,
        token: req.user?.refreshToken,
      },
      urls: urlsFromUser,
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
  const { urlId, customLink } = req.body;

  try {
    const linkToUpdate = await Urls.findOne({
      where: {
        id: urlId,
      },
    });

    if (!linkToUpdate) {
      res.status(404).json({
        ok: false,
        status: 404,
        message: "Link doesn't exist",
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
          id: linkToUpdate.dataValues.id,
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
        id: urlId,
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

const deleteLink = async (req: Request, res: Response) => {
  const { id }: { id: number } = req.body;

  try {
    const urlToRemove = await Urls.findOne({
      where: {
        id,
      },
    });

    if (!urlToRemove) {
      res.status(404).json({
        ok: false,
        status: 404,
        message: "Url doesn't exist",
      });
      return;
    }

    const user = await User.findOne({
      where: {
        id: req.user?.id,
      },
    });

    if (user?.dataValues.id !== urlToRemove.dataValues.userId) {
      res.status(403).json({
        ok: false,
        status: 403,
        message: 'Forbidden to remove this url',
      });
      return;
    }

    const deleteUrl = await Urls.destroy({
      where: {
        id,
      },
    });

    if (deleteUrl !== 1) {
      res.status(400).json({
        ok: false,
        status: 400,
        message: 'It is not possible to delete the url',
      });
      return;
    }

    res.status(200).json({
      ok: true,
      status: 200,
      message: 'Url remove successfully',
      user: req.user,
      urlDeleted: {
        id: urlToRemove.dataValues.id,
        originalLink: urlToRemove.dataValues.original,
        link: `${process.env.DOMAIN}${urlToRemove.dataValues.customLink}`,
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
  getUserUrls,
  updateCustomLink,
  deleteLink,
};
