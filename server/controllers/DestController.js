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
}

module.exports = DestController;
