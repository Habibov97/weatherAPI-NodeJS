const express = require('express');
const cityWeatherController = require('../controllers/city-weather.controller');
const cityWeatherRouter = express.Router();

cityWeatherRouter
  .route('/city-weather')
  .get(cityWeatherController.getCitiesWeather)
  .post(cityWeatherController.createCityWeather);

cityWeatherRouter
  .route('/city-weather/:id')
  .get(cityWeatherController.getCityWeather)
  .delete(cityWeatherController.deleteCityWeather);

module.exports = cityWeatherRouter;
