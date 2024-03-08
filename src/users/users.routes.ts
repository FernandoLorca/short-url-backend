import { Router } from 'express';
import { userMiddlewares } from './users.middlewares';
import { usersController } from './users.controller';

const usersRouter = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *         id:
 *           type: integer
 *           description: 'The auto-generated id of the user'
 *         username:
 *           type: string
 *           description: 'The username of the user'
 *         email:
 *           type: string
 *           description: 'The email of the user'
 *         token:
 *           type: string
 *           description: 'The token of the user'
 *      required:
 *        - username
 *        - email
 *        - token
 *      example:
 *        id: 1
 *        username: 'Username example'
 *        email: 'example@example.com'
 *        token: 'string-token-example'
 */

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: The users managing API
 */

usersRouter.post(
  '/signin',
  userMiddlewares.JSONValidation,
  userMiddlewares.signInInputsValidations,
  userMiddlewares.signInVerificationByEmail,
  usersController.getUser
);
/**
 * @swagger
 * /api/v1/user/signin:
 *  post:
 *   summary: Sign in user
 *   tags: [Users]
 *   requestBody:
 *    required: true
 *    content:
 *      application/json:
 *        schema:
 *          type: object
 *          properties:
 *            email:
 *              type: string
 *            password:
 *              type: string
 *   responses:
 *    200:
 *      description: User signed in successfully
 *      content:
 *        application/json:
 *         schema:
 *          type: object
 *          properties:
 *            ok:
 *              type: boolean
 *            status:
 *              type: integer
 *            message:
 *              type: string
 *            user:
 *              $ref: '#/components/schemas/User'
 *    400:
 *      description: Invalid JSON, all fields are required, invalid email, password must be between 6 and 24 characters, password do not match
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              ok:
 *                type: boolean
 *              status:
 *                type: integer
 *              message:
 *                type: string
 *    404:
 *      description: User not found
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              ok:
 *                type: boolean
 *              status:
 *                type: integer
 *              message:
 *                type: string
 *    409:
 *      description: Email already exists
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              ok:
 *                type: boolean
 *              status:
 *                type: integer
 *              message:
 *                type: string
 *    500:
 *      description: Internal server error
 */

usersRouter.post(
  '/signup',
  userMiddlewares.JSONValidation,
  userMiddlewares.signUpInputsValidations,
  userMiddlewares.signUpVerificationByEmail,
  usersController.createUser
);
/**
 * @swagger
 * /api/v1/user/signup:
 *  post:
 *    summary: Sign up user
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *              email:
 *                type: string
 *              password:
 *                type: string
 *              repeatPassword:
 *                type: string
 *    responses:
 *      200:
 *        description: User signed up successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                status:
 *                  type: integer
 *                message:
 *                  type: string
 *                user:
 *                  $ref: '#/components/schemas/User'
 *      400:
 *        description: Invalid JSON, all fields are required, invalid email, password must be between 6 and 24 characters, password do not match
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                status:
 *                  type: integer
 *                message:
 *                  type: string
 *      409:
 *        description: Email already exists
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                status:
 *                  type: integer
 *                message:
 *                  type: string
 *      500:
 *        description: Internal server error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                status:
 *                  type: integer
 *                message:
 *                  type: string
 */

export default usersRouter;
