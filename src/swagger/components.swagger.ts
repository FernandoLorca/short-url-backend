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
