const express = require('express');
const auth = express.Router();

const { register, login } = require('../query/auth.js');

auth.post('/register', register);
auth.post('/login', login);

module.exports = auth;