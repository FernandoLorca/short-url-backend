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
 *
 * /api/v1/urls/getLinks:
 *  post:
 *    summary: Get all user's urls
 *    tags: [Urls]
 *    responses:
 *      200:
 *        description: The urls were retrieved successfully
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
 *
 * /api/v1/urls/update:
 *  put:
 *    summary: Update a custom link
 *    tags: [Urls]
 *    responses:
 *      200:
 *        description: The urls were retrieved successfully
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
 *
 * /api/v1/urls/delete:
 *  delete:
 *    summary: Delete a link
 *    tags: [Urls]
 *    responses:
 *      201:
 *        description: Url remove successfully
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
 *                urlDeleted:
 *                  type: object
 *                  properties:
 *                      id:
 *                          type: integer
 *                      originalLink:
 *                          type: string
 *                      link:
 *                          type: string
 *      400:
 *        description: Invalid JSON, jst must be provided, it is not possible to delete the url
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Error'
 *      401:
 *        description: Token is required, token expired
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Error'
 *      403:
 *          description: Forbidden to remove this url
 *          content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  $ref: '#/components/schemas/Error'
 *      404:
 *          description: Url doesn't exist, user not found
 *          content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  $ref: '#/components/schemas/Error'
 *      500:
 *        description: Internal server error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Error'
 */
