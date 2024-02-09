import { Router } from 'express';
import { urlsMiddlewares } from './urls.middlewares';
import { urlsController } from './urls.controller';

const urlsRouter = Router();

urlsRouter.post(
  '/shorten',
  urlsMiddlewares.verifyToken,
  urlsMiddlewares.refreshToken,
  urlsMiddlewares.urlsValidation,
  urlsMiddlewares.hashUrl,
  urlsController.storageUrlDatabase
);
urlsRouter.post(
  '/update',
  urlsMiddlewares.verifyToken,
  urlsMiddlewares.refreshToken,
  urlsController.updateCustomLink
);

export default urlsRouter;
