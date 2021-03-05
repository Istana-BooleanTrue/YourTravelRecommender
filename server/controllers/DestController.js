const { Destination, User } = require('../models/index.js');
const axios = require('axios');

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

            let random = Math.ceil(Math.random() * 10);

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

    static getWeather = async (req, res, next) => {
        try {
            let apiKey = process.env.API_WEATHER;
            let cityName = 'Jakarta';
            let response = await axios({
                method: 'GET',
                url: `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`,
            });

            res.status(200).json(response.data);
        } catch (err) {
            next(err);
        }
    };

    static quotes = async (req, res, next) => {
        try {
            let response = await axios({
                method: 'GET',
                url: `https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand`,
            });
            res.status(200).json(response.data);
        } catch (err) {
            next(err);
        }
    };
}

module.exports = DestController;
