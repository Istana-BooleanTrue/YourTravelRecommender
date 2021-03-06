const { Destination, User } = require('../models/index.js');

const { comparePassword } = require('../helpers/bcrypt.js');

const { generateToken } = require('../helpers/jwt.js');

const { OAuth2Client } = require('google-auth-library');

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

    static loginGoogle = (req, res, next) => {
        const client = new OAuth2Client('641781171342-18velpmujtc06m2n7gtlbsfcnaqhpj1o.apps.googleusercontent.com');
        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: req.body.google_token,
                audience: '641781171342-18velpmujtc06m2n7gtlbsfcnaqhpj1o.apps.googleusercontent.com',
            });

            const googleUserParams = ticket.getPayload();

            User.findOrCreate({
                where: {
                    email: googleUserParams.email,
                },
                defaults: {
                    email: googleUserParams.email,
                    password: new Date().toDateString(),
                },
            })
                .then((user) => {
                    let payload = { id: user[0].id, email: user[0].email };
                    res.status(200).json({
                        id: user[0].id,
                        email: user[0].email,
                        access_token: generateToken(payload.id, payload.email),
                    });
                })
                .catch((err) => {
                    next(err);
                });
        }
        verify();
    };
}

module.exports = UserController;
