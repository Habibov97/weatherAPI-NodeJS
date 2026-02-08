const express = require('express');
const cityWeatherController = require('../controllers/weather.controller');
const cityWeatherRouter = express.Router();

cityWeatherRouter.route('/').get(cityWeatherController.getCitiesWeatherList);
cityWeatherRouter.route('/:id').get(cityWeatherController.getCityWeather);

module.exports = cityWeatherRouter;
