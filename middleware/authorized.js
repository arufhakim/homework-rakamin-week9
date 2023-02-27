const jwt = require('jsonwebtoken');

const authorized = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];

    jwt.verify(token, 'code-sangat-rahasia', (err, decoded) => {
        const {role} = decoded;
        if (role === 'Project Manager') {
            next();
        } else {
            res.send('Forbidden!').end();
        }
    });
}

module.exports = authorized;