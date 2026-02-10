const express = require('express');
const cityWeatherController = require('../controllers/weather.controller');
const cityWeatherRouter = express.Router();

cityWeatherRouter.route('/').get(cityWeatherController.getCitiesWeatherList);
cityWeatherRouter.route('/:city').get(cityWeatherController.getCityWeatherList);

module.exports = cityWeatherRouter;
