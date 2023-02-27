const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const morgan = require('morgan');
const fs = require('fs');

// router
const movies = require('./router/movies');
const users = require('./router/users');
const auth = require('./router/auth');

app.use(bodyParser.json());

app.use(morgan('tiny'));

app.get('/', (req, res) => {
    res.send('Welcome to Movies Database!').end();
})

app.use(movies);
app.use(users);
app.use(auth);

app.use((req, res) => {
    res.status(404).send('404 Not Found').end();
});

const port = 3000;

app.listen(port, () => {
    console.log(`Server listening on ${port}...`);
});