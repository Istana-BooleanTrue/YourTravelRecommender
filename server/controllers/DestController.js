const { Destination, User } = require('../models/index.js');

class DestController {
    static showAll = async (req, res, next) => {
        try {
            let dest = await Destination.findAll();
            if (!dest) {
                throw {
                    status: 404,
                    message: `Not Found`,
                };
            }
            res.status(200).json({ dest });
        } catch (err) {
            next(err);
        }
    };

    static showOne = async (req, res, next) => {
        try {
            let all = await Destination.findAll();

            if (!all) {
                throw {
                    status: 404,
                    message: `Not Found`,
                };
            }

            let random = Math.ceil(Math.random() * all.length);

            let dest = await Destination.findOne({
                where: {
                    id: random,
                },
            });

            if (!dest) {
                throw {
                    status: 404,
                    message: `Not Found`,
                };
            }

            res.status(200).json({ dest });
        } catch (err) {
            next(err);
        }
    };
}

module.exports = DestController;
