const User = require('../models/Users');
const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthenticatedError('Authentications Invalid')
    }

    const token = authHeader.split(' ')[1]

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = { userId: payload.userId, name: payload.name };
        console.log(payload.userId);
        next()
    } catch (error) {
        throw new UnauthenticatedError('Authentications Invalid test')
    }
};

module.exports = auth;
