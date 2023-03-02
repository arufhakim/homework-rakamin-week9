const jwt = require('jsonwebtoken');

const verify = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1];

        jwt.verify(token, 'code-sangat-rahasia', (err, decoded) => {
            if (err) {
                res.status(401).json({ message: 'Unauthorized!' });
            } else {
                next();
            }
        });
    } catch (err) {
        res.status(401).json({ message: 'No token provided!' });
    }
};

module.exports = verify;