import { Router } from 'express';
import { userMiddlewares } from './users.middlewares';
import { usersController } from './users.controller';

const usersRouter = Router();

usersRouter.post(
  '/login',
  userMiddlewares.signInInputsValidations,
  usersController.getUser
);

export default usersRouter;
