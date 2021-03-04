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

    static getWeather = (req, res, next) => {
        let apiKey = process.env.API_WEATHER;
        let cityName = 'Jakarta'
        axios({
            method : 'GET',
            url : `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`
        })
        .then(response => {
            res.status(200).json(response.data)
        })
        .catch(err => {
            if(err.response.status) {
                next({code : err.response.status, message : 'API Key not found'})
            }
        })
    }
}

module.exports = DestController;
