/**
 * @swagger
 * components:
 *   schemas:
 *      movie:
 *          type: object
 *          required:
 *              title
 *              genre
 *              year
 *          properties:
 *              id:
 *                type: string
 *                description: The Id of the movie
 *              title:
 *                type: string
 *                description: The title of the movie
 *              genre:
 *                type: string
 *                description: The genre of the movie
 *              year:
 *                type: integer
 *                description: The year of the movie was produced
 *          examples:
 *              id: asdwasd
 *              title: The Movie
 *              genre: Action
 *              year: 2023
 *
 * tags:
 *      name: Movies
 *      description: The Movies managing API
 * /movies:
 *  post:
 *      summary: Create a new Movie
 *      tags: [Movie]
 *      requestBody:
 *          required: true
 *          content:
 *              applications/json:
 *                  schema:
 *                      $ref: '#/components/schemas/movie'
 *      responses:
 *        200:
 *            description: The created movie.
 *            content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/movie'
 *
 *        500:
 *          description: Some server error
 * /movie/{id}:
 *    get:
 *      summary: Get the movie by Id
 *      tags: [Movie]
 *      requestBody:
 *          required: true
 *          content:
 *              applications/json:
 *                  schema:
 *                      $ref: '#/components/schemas/movie'
 *      responses:
 *        200:
 *            description: The movie response by id
 *            content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/movie'
 *
 *        404:
 *          description: The movie was not found
 *    put:
 *      summary: Change the movie by Id
 *      tags: [Movie]
 *      requestBody:
 *          required: true
 *          content:
 *              applications/json:
 *                  schema:
 *                      $ref: '#/components/schemas/movie'
 *      responses:
 *        200:
 *            description: The movie response by id
 *            content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/movie'
 *
 *        404:
 *          description: The movie was not found
 *    delete:
 *      summary: Delete the movie by Id
 *      tags: [Movie]
 *      requestBody:
 *          required: true
 *          content:
 *              applications/json:
 *                  schema:
 *                      $ref: '#/components/schemas/movie'
 *      responses:
 *        200:
 *            description: The movie to delete by Id
 *            content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/movie'
 *
 *        404:
 *          description: The movie was not found
 */
