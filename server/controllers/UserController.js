const { Destination, User } = require('../models/index.js');

const { comparePassword } = require('../helpers/bcrypt.js');

const { generateToken } = require('../helpers/jwt.js');

class UserController {
    static register = async (req, res, next) => {
        try {
            let theEmail = req.body.email;
            let thePassword = req.body.password;
            let user = await User.create({ email: theEmail, password: thePassword });

            if (!user) {
                throw {
                    status: 401,
                    message: `Not Authorized`,
                };
            }

            res.status(201).json({ id: user.id, email: user.email });
        } catch (err) {
            next(err);
        }
    };

    static login = async (req, res, next) => {
        try {
            let theEmail = req.body.email;
            let password = req.body.password;

            let theUser = await User.findOne({
                where: {
                    email: theEmail,
                },
            });

            if (theUser && comparePassword(password, theUser.password) === true) {
                let access_token = generateToken(theUser.id, theUser.email);

                res.status(200).json({ access_token });
            } else {
                throw {
                    status: 401,
                    message: 'email / password is wrong',
                };
            }
        } catch (err) {
            next(err);
        }
    };
}

module.exports = UserController;
