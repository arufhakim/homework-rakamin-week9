const express = require('express');
const movies = express.Router();
const verify = require('../middleware/verify.js');
const { getMovies, createMovies, updateMovies, deleteMovies } = require('../query/movies.js');

/**
 * @swagger
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: id of the movie
 *         title:
 *           type: string
 *           description: title of the movie
 *         genres:
 *           type: string
 *           description: genres of the movie
 *         year:
 *           type: string
 *           description: year of the movie
 *       example:
 *         id: 1
 *         title: Reckless
 *         genres: Comedy|Drama|Romance
 *         year: 2001
 */

/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: The movies managing API
 * /movies:
 *   get:
 *     summary: Lists all the movies
 *     security:
 *       - bearerAuth: []
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: The list of the books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 *   post:
 *     summary: Create a new movie
 *     security:
 *       - bearerAuth: []
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       200:
 *         description: The created movies.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       500:
 *         description: Some server error
 * 
 * /movies/{id}:
 *   put:
 *    summary: Update the movie by the id
 *    security:
 *       - bearerAuth: []
 *    tags: [Movies]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: int
 *        required: true
 *        description: The movie id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Movie'
 *    responses:
 *      200:
 *        description: The movie was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Movie'
 *      404:
 *        description: The movie was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the movie by id
 *     security:
 *       - bearerAuth: []
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: int
 *         required: true
 *         description: The movie id
 *
 *     responses:
 *       200:
 *         description: The movie was deleted
 *       404:
 *         description: The movie was not found
 */

movies.route('/movies')
    .get(verify, getMovies)
    .post(verify, createMovies);

movies.route('/movies/:id')
    .put(verify, updateMovies)
    .delete(verify, deleteMovies);

module.exports = movies;