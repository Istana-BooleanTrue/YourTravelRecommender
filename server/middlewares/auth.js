const { verifyToken } = require('../helpers/jwt');

const { User, Destination } = require('../models');

const authenticate = async (req, res, next) => {
    try {
        let token = verifyToken(req.headers.access_token);
        console.log(req.headers.access_token);
        console.log(token);
        let user = await User.findOne({
            where: { id: token.id, email: token.email },
        });

        if (user) {
            req.currentUser = { id: user.id, email: user.email };
            next();
        } else {
            throw {
                status: 401,
                message: `Unauthorized`,
            };
        }
    } catch (err) {
        next(err);
    }
};

module.exports = {
    authenticate,
};
