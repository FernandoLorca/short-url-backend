import { Router } from 'express';
import { userMiddlewares } from '../users/users.middlewares';
import { urlsMiddlewares } from './urls.middlewares';
import { urlsController } from './urls.controller';

const urlsRouter = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Url:
 *      type: object
 *      properties:
 *        id:
 *          type: boolean
 *          description: 'The auto-generated id of the url'
 *        originalUrl:
 *          type: string
 *          description: 'The original url'
 *        shortUrl:
 *          type: string
 *          description: 'The short url'
 *        customLink:
 *          type: string | null
 *          description: 'The custom link'
 *      required:
 *        - originalUrl
 *        - shortUrl
 *      example:
 *        id: 1
 *        originalUrl: 'https://example.com'
 *        shortUrl: 'https://domain.com/p7zr1vVOrG'
 *        customLink: 'example-of-custom-link'
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Error:
 *      type: object
 *      properties:
 *        ok:
 *          type: boolean
 *        status:
 *          type: integer
 *        message:
 *          type: string
 *      required:
 *        - ok
 *        - status
 *      example:
 *        ok: false
 *        status: 400
 *        message: 'Error message'
 */

/**
 * @swagger
 * tags:
 *  name: Urls
 *  description: The urls managing API
 */

urlsRouter.post(
  '/shorten',
  urlsMiddlewares.JSONValidation,
  userMiddlewares.verifyToken,
  userMiddlewares.refreshToken,
  urlsMiddlewares.urlsValidation,
  urlsMiddlewares.hashUrl,
  urlsController.storageUrlDatabase
);

/**
 * @swagger
 * /api/v1/urls/shorten:
 *  post:
 *    summary: Shorten a url
 *    tags: [Urls]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              url:
 *                type: string
 *    responses:
 *      201:
 *        description: The url was shortened successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                status:
 *                  type: integer
 *                user:
 *                  $ref: '#/components/schemas/User'
 *                data:
 *                  $ref: '#/components/schemas/Url'
 *      400:
 *        description: Invalid JSON, jwt must be provided, URLs doesn't exist, invalid URL, end of URL must have a '/', procotol https/http is incorrect
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Error'
 *      401:
 *        description: Token is required, jwt must be provided, token expired, user not found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Error'
 *      500:
 *        description: Internal server error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Error'
 */

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
