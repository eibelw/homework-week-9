/**
 * @swagger
 * components:
 *  schemas:
 *    user:
 *      type: object
 *      required:
 *        email
 *        gender
 *        password
 *        role
 *      properties:
 *        id:
 *          type: string
 *          description: The Id of the user
 *        email:
 *          type: string
 *          description: The email of the user
 *        gender:
 *          type: string
 *          description: The gender of the user
 *        password:
 *          type: string
 *          description: The password of the user
 *        role:
 *           type: string
 *           description: The role of the user
 *      examples:
 *        id: asdwasd
 *        email: user@email.com
 *        gender: Male
 *        password: awasdwas
 *        role: Manager
 *
 * tags:
 *  name: Users
 *  description: The Users managing API
 * /user:
 *  post:
 *    summary: Create a new User
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        applications/json:
 *          schema:
 *            $ref: '#/components/schemas/user'
 *    responses:
 *      200:
 *        description: The created user.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/user'
 *      500:
 *        description: Some server error
 * /user/{id}:
 *  get:
 *    summary: Get the user by Id
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        applications/json:
 *          schema:
 *            $ref: '#/components/schemas/user'
 *    responses:
 *      200:
 *        description: The user response by id
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/user'
 *      404:
 *        description: The user was not found
 *  put:
 *    summary: Change the user by Id
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        applications/json:
 *          schema:
 *            $ref: '#/components/schemas/user'
 *    responses:
 *      200:
 *        description: The user response by id
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/user'
 *      404:
 *        description: The user was not found
 *  delete:
 *    summary: Delete the user by Id
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        applications/json:
 *          schema:
 *            $ref: '#/components/schemas/user'
 *    responses:
 *      200:
 *        description: The user to delete by Id
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/user'
 *      404:
 *        description: The user was not found
 *
 */
