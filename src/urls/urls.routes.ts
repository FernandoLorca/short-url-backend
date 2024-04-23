import { Router } from 'express';
import { userMiddlewares } from '../users/users.middlewares';
import { urlsMiddlewares } from './urls.middlewares';
import { urlsController } from './urls.controller';

const urlsRouter = Router();

urlsRouter.post(
  '/shorten',
  urlsMiddlewares.JSONValidation,
  userMiddlewares.verifyToken,
  userMiddlewares.refreshToken,
  urlsMiddlewares.urlsValidation,
  urlsMiddlewares.hashUrl,
  urlsMiddlewares.customLinkValidation,
  urlsController.storageUrlDatabase
);

urlsRouter.get(
  '/getUrls',
  userMiddlewares.verifyToken,
  userMiddlewares.refreshToken,
  urlsController.getUserUrls
);

urlsRouter.patch(
  '/update',
  urlsMiddlewares.JSONValidation,
  userMiddlewares.verifyToken,
  userMiddlewares.refreshToken,
  urlsController.updateCustomLink
);

urlsRouter.delete(
  '/delete',
  urlsMiddlewares.JSONValidation,
  userMiddlewares.verifyToken,
  userMiddlewares.refreshToken,
  urlsController.deleteLink
);

export default urlsRouter;
