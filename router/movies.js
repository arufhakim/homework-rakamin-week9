const express = require('express');
const movies = express.Router();
const verify = require('../middleware/verify.js');
const { getMovies, createMovies, updateMovies, deleteMovies } = require('../query/movies.js');


movies.route('/movies')
    .get(verify, getMovies)
    .post(verify, createMovies);

movies.route('/movies/:id')
    .put(verify, updateMovies)
    .delete(verify, deleteMovies);

module.exports = movies;