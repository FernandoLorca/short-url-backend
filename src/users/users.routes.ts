import { Router } from 'express';
import { userMiddlewares } from './users.middlewares';
import { usersController } from './users.controller';

const usersRouter = Router();

usersRouter.post(
  '/signin',
  userMiddlewares.JSONValidation,
  userMiddlewares.signInInputsValidations,
  userMiddlewares.signInVerificationByEmail,
  usersController.getUser
);

usersRouter.post(
  '/signup',
  userMiddlewares.JSONValidation,
  userMiddlewares.signUpInputsValidations,
  userMiddlewares.signUpVerificationByEmail,
  usersController.createUser
);

export default usersRouter;
