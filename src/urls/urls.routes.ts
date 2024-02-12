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
  urlsController.storageUrlDatabase
);
urlsRouter.get(
  '/getLinks',
  userMiddlewares.verifyToken,
  userMiddlewares.refreshToken,
  urlsController.getUserUrls
);
urlsRouter.post(
  '/update',
  urlsMiddlewares.JSONValidation,
  userMiddlewares.verifyToken,
  userMiddlewares.refreshToken,
  urlsController.updateCustomLink
);
urlsRouter.post(
  '/delete',
  urlsMiddlewares.JSONValidation,
  userMiddlewares.verifyToken,
  userMiddlewares.refreshToken,
  urlsController.deleteLink
);

export default urlsRouter;
