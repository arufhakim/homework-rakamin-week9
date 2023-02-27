const pool = require('../connection/database.js');

const getMovies = (req, res) => {
    const query = `SELECT * FROM movies LIMIT $1`;
    const limit = req.query.limit;
    pool.query(query, [limit], (err, result) => {
        if (err) throw new Error(err.message);
        res.status(200).json(result.rows).end();
    })
};

const createMovies = (req, res) => {
    const { id, title, genres, year } = req.body;
    const query = `INSERT INTO movies (id, title, genres, year) VALUES ($1, $2, $3, $4)`;
    pool.query(query, [id, title, genres, year], (err, result) => {
        if (err) throw new Error(err.message);
        res.status(200).send('Succesfully created new movie!').end();
    });
}

const updateMovies = (req, res) => {
    const { title, genres, year } = req.body;
    const id = parseInt(req.params.id);
    const query = `UPDATE movies SET title = $1, genres = $2, year =$3 WHERE id = $4`;
    pool.query(query, [title, genres, year, id], (err, result) => {
        if (err) throw new Error(err.message);
        res.status(200).send('Succesfully updated movie!').end();
    })
}

const deleteMovies = (req, res) => {
    const id = parseInt(req.params.id);
    const query = `DELETE FROM movies WHERE id = $1`;
    pool.query(query, [id], (err, result) => {
        if (err) throw new Error(err.message);
        res.status(200).send('Succesfully deleted movie!').end();
    })
}

module.exports = { getMovies, createMovies, updateMovies, deleteMovies };


