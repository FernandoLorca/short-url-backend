import { Router } from 'express';
import { userMiddlewares } from './users.middlewares';
import { usersController } from './users.controller';

const usersRouter = Router();

usersRouter.post(
  '/signin',
  userMiddlewares.signInInputsValidations,
  usersController.getUser
);

usersRouter.post(
  '/signup',
  userMiddlewares.signUpInputsValidations,
  userMiddlewares.signUpVerificationByEmail,
  usersController.createUser
);

export default usersRouter;
