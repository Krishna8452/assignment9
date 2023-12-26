  const express = require("express");
  const router = express.Router();
  const{
    getAllUsers,
    getUser,
    addUser,
    editUser,
    deleteUser,
    userLogin,
    testing
  } = require("../modules/user/controller/userController");
  const {uploadImage} = require("../helper/imageUpload")
  const {jwtAuthentication} = require("../middleware/jwtAuthentication")
  const yupValidatorMiddleware = require("../middleware/yupValidatorMiddleware")
  const {createUserSchema, updataUserSchema, isValidIdSchema, getUserSchema} =require("../modules/user/validation/validator")

  /**
   * @swagger
   * components:
   *   schemas:
   *     User:
   *       type: object
   *       required:
   *         - name
   *         - username
   *         - password
   *         - email
   *       properties:
   *         id:
   *           type: string
   *           format: uuid
   *           description: Auto-generated user ID
   *         name:
   *           type: string
   *           description: User's name
   *         username:
   *           type: string
   *           description: User's username
   *         password:
   *           type: string
   *           description: User's password
   *         email:
   *           type: string
   *           format: email
   *           description: User's email
   *         address:
   *           type: string
   *           description: User's address
   *         phone:
   *           type: string
   *           description: User's phone number
   *         image:
   *           type: string
   *           format: binary
   *           description: User's image
   *       example:
   *         name: John Doe
   *         username: johndoe
   *         password: secret123
   *         email: john@example.com
   *         address: 123 Main St, City
   *         phone: 9800761234
   */

  /**
   * @swagger
   * /api/users:
   *   get:
   *     summary: Get all users
   *     tags:
   *       - User
   *     parameters:
   *       - in: query
   *         name: page
   *         schema:
   *           type: integer
   *         description: The page number for pagination (default is 1)
   *       - in: query
   *         name: perPage
   *         schema:
   *           type: integer
   *         description: The page number for pagination (default is 5)
   *     responses:
   *       '200':
   *         description: User list retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/User'
   *       '500':
   *         description: Internal server error
   */

  /**
   * @swagger
   * /api/users/{id}:
   *   get:
   *     summary: Get a user by ID
   *     tags:
   *       - User
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *     responses:
   *       '200':
   *         description: User retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       '500':
   *         description: Internal server error
   *   put:
   *     summary: Update a user by ID
   *     tags:
   *       - User
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/User'
   *     responses:
   *       '200':
   *         description: User updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       '500':
   *         description: Internal server error
   */

  /**
   * @swagger
   * /api/users/login:
   *   post:
   *     summary: User login
   *     tags:
   *       - User
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               username:
   *                 type: string
   *                 description: User's username
   *               password:
   *                 type: string
   *                 description: User's password
   *             required:
   *               - username
   *               - password
   *     responses:
   *       '200':
   *         description: User logged in successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       '500':
   *         description: Internal server error
   */

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     security:
 *       - BearerAuth: []  # Reference to the security scheme
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *       '401':
 *         description: Unauthorized - Missing or invalid token
 *         content:
 *           application/json:
 *             example:
 *               error: "Unauthorized"
 *               message: "Token is missing or invalid"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 *               message: "An error occurred while processing the request"
 *
 * securitySchemes:
 *   BearerAuth:  # Security scheme definition
 *     type: apiKey
 *     in: header
 *     name: Authorization
 *     description: Bearer token in the format "Bearer {token}"
 */


  /**
   * @swagger 
   * /api/users:
   *   post:
   *     summary: Add a new user
   *     tags:
   *       - User
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/User'
   *     responses:
   *       '200':
   *         description: User added successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       '500':
   *         description: Internal server error
   */

  router.route("/test").post(testing);
  router.route("/users/login").post(userLogin);
  router.route("/users").get(yupValidatorMiddleware(getUserSchema), getAllUsers);
  router.route("/users").post(yupValidatorMiddleware(createUserSchema), addUser);
  router.route("/users/:id").get(yupValidatorMiddleware(isValidIdSchema), getUser);
  router.route("/users/:id").put(yupValidatorMiddleware(updataUserSchema), editUser);

  router.use(jwtAuthentication)
  router.route("/users/:id").delete(yupValidatorMiddleware(isValidIdSchema), deleteUser);

  module.exports = router;