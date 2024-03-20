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
