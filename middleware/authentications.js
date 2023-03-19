const User = require('../models/Users');
const jwt = require('jsonwebtoken')
const { UnauthenticatedError, NotFoundError } = require('../errors')

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthenticatedError('Authentications Invalid')
    }

    const token = authHeader.split(' ')[1]

    try {
        // Verify token (no change happens, expired token)
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(payload.userId); 
        // Check if user exists
        if (!user)
            throw new NotFoundError(`The user that belong to this token does no longer exist`)
        req.user = { userId: payload.userId, name: payload.name };
        next()
    } catch (error) {
        throw new UnauthenticatedError('Authentications Invalid test')
    }
};

module.exports = auth;
