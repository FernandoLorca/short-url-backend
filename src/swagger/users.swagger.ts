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
 *            $ref: '#/components/schemas/Error'
 *    404:
 *      description: User not found
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Error'
 *    409:
 *      description: Email already exists
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Error'
 *    500:
 *      description: Internal server error
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Error'
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
 *      201:
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
 *              $ref: '#/components/schemas/Error'
 *      409:
 *        description: Email already exists
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
