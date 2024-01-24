import { Router } from 'express';
import { userMiddlewares } from './users.middlewares';
import { usersController } from './users.controller';

const usersRouter = Router();

usersRouter.post(
  '/signin',
  userMiddlewares.signInJSONValidation,
  userMiddlewares.signInInputsValidations,
  userMiddlewares.signInVerificationByEmail,
  usersController.getUser
);

usersRouter.post(
  '/signup',
  userMiddlewares.signInJSONValidation,
  userMiddlewares.signUpInputsValidations,
  userMiddlewares.signUpVerificationByEmail,
  usersController.createUser
);

export default usersRouter;
