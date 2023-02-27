const express = require('express');
const users = express.Router();
const verify = require('../middleware/verify.js');
const authorized = require('../middleware/authorized.js');

const { getUsers, updateUsers, deleteUsers } = require('../query/users.js');

users.get('/users', verify, getUsers);

users.route('/users/:id')
    .put(verify, updateUsers)
    .delete(verify, authorized, deleteUsers);

module.exports = users;