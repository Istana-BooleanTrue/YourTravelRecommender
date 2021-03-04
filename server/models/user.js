'use strict';
const { hashPassword } = require('../helpers/bcrypt.js');

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    User.init(
        {
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        message: `Email cannot be empty`,
                    },
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        message: `Password cannot be empty`,
                    },
                    len: {
                        args: [6, 25],
                        message: `Password must be 6 to 25 characters`,
                    },
                },
            },
        },
        {
            sequelize,
            modelName: 'User',
        }
    ),
        User.addHook('beforeCreate', (user, opt) => {
            user.password = hashPassword(user.password);
        });
    return User;
};
