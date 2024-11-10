const jwt = require('jsonwebtoken');
const JWT_SECRET = 'yourSecretKey';

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    console.log('Token received:', token);
    if (!token) return res.status(401).json({ msg: 'Access denied' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ msg: 'Invalid token' });
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
