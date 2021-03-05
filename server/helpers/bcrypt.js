const bcrypt = require('bcrypt');

function hashPassword(pass) {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(pass, salt);
}

function comparePassword(pass, hash) {
    return bcrypt.compareSync(pass, hash);
}

module.exports = {
    hashPassword,
    comparePassword,
};
