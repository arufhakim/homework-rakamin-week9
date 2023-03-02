const express = require('express');
const users = express.Router();
const verify = require('../middleware/verify.js');
const authorized = require('../middleware/authorized.js');

const { getUsers, updateUsers, deleteUsers } = require('../query/users.js');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: id of the user
 *         email:
 *           type: string
 *           description: email of the user
 *         gender:
 *           type: string
 *           description: gender of the user
 *         password:
 *           type: string
 *           description: password of the user
 *         role :
 *           type: string
 *           description: role of the user
 *       example:
 *         id: 1
 *         email: arufhakim@gmail.com
 *         gender: Male
 *         password: root
 *         role: Supervisor
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The user managing API
 * /users:
 *   get:
 *     summary: Lists all the users
 *     security:
 *       - bearerAuth: []
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 * 
 * /users/{id}:
 *   put:
 *    summary: Update the user by the id
 *    security:
 *       - bearerAuth: []
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: int
 *        required: true
 *        description: The user id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: Succesfully updated user!
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      404:
 *        description: The user was not found!
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the user by id
 *     security:
 *       - bearerAuth: []
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: int
 *         required: true
 *         description: The user id
 *
 *     responses:
 *       200:
 *         description: Succesfully deleted user!
 *       404:
 *         description: The user was not found!
 */

users.get('/users', verify, getUsers);

users.route('/users/:id')
    .put(verify, authorized, updateUsers)
    .delete(verify, authorized, deleteUsers);

module.exports = users;