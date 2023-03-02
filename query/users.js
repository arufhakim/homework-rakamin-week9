const pool = require('../connection/database.js');
const bcrypt = require('bcrypt');

const getUsers = (req, res) => {
    const query = 'SELECT * FROM users LIMIT $1 OFFSET $2';
    const limit = req.query.limit || 10;
    const offset = req.query.offset || 0;
    pool.query(query, [limit, offset], (err, result) => {
        if (err) throw new Error(err.message);
        res.status(200).json(result.rows).end();
    })
};

const updateUsers = (req, res) => {
    const { email, gender, password, role } = req.body;
    const id = parseInt(req.params.id);

    const getUserbyId = `SELECT id FROM users WHERE id = $1`;
    pool.query(getUserbyId, [id], (err, getResult) => {
        if (err) throw new Error(err.message);
        if (getResult.rows.length > 0) {
            const query = `UPDATE users SET email = $1, gender = $2, password = $3, role = $4 WHERE id = $5`;
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) throw new Error(err.message);
                pool.query(query, [email, gender, hash, role, id], (err, result) => {
                    if (err) throw new Error(err.message);
                    res.status(200).json({ message: 'Succesfully updated user!' }).end();
                });
            });
        } else {
            res.status(404).json({ message: 'The user was not found!' }).end();
        }
    });
}

const deleteUsers = (req, res) => {
    const id = parseInt(req.params.id);

    const getUserbyId = `SELECT id FROM users WHERE id = $1`;
    pool.query(getUserbyId, [id], (err, getResult) => {
        if (err) throw new Error(err.message);
        if (getResult.rows.length > 0) {
            const query = `DELETE FROM users WHERE id = $1`;
            pool.query(query, [id], (err, result) => {
                if (err) throw new Error(err.message);
                res.status(200).json({ message: 'Succesfully deleted user!' }).end();
            });
        } else {
            res.status(404).json({ message: 'The user was not found!' }).end();
        }
    });
}

module.exports = { getUsers, updateUsers, deleteUsers };



