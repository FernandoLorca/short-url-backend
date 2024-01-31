import { Router } from 'express';
import { urlsMiddlewares } from './urls.middlewares';

const urlsRouter = Router();

urlsRouter.post('/shorten', urlsMiddlewares.verifyToken);

export default urlsRouter;
