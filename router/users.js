const express = require('express');
const users = express.Router();
const verify = require('../middleware/verify.js');

const { getUsers, updateUsers, deleteUsers } = require('../query/users.js');

users.get('/users', verify, getUsers);

users.route('/users/:id')
    .put(verify, updateUsers)
    .delete(verify, deleteUsers);

module.exports = users;