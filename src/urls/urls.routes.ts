import { Router } from 'express';
import { userMiddlewares } from '../users/users.middlewares';
import { urlsMiddlewares } from './urls.middlewares';
import { urlsController } from './urls.controller';

const urlsRouter = Router();

urlsRouter.post(
  '/shorten',
  userMiddlewares.verifyToken,
  userMiddlewares.refreshToken,
  urlsMiddlewares.urlsValidation,
  urlsMiddlewares.hashUrl,
  urlsController.storageUrlDatabase
);

export default urlsRouter;
