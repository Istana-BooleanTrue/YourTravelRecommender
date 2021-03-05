const jwt = require('jsonwebtoken');

const generateToken = (theId, theEmail) =>
    jwt.sign(
        {
            id: theId,
            email: theEmail,
        },
        process.env.JWT_SECRET || process.env.example.JWT_SECRET
    );

const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET || process.env.example.JWT_SECRET);

module.exports = {
    generateToken,
    verifyToken,
};
