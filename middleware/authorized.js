const jwt = require('jsonwebtoken');

const authorized = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];

    jwt.verify(token, 'code-sangat-rahasia', (err, decoded) => {
        const { role } = decoded;
        if (role === 'Project Manager') {
            next();
        } else {
            res.status(403).json({ message: 'Forbidden! you dont have permission to access this resource' }).end();
        }
    });
}

module.exports = authorized;