const express = require('express');
const cityController = require('../controllers/city.controller');
const cityRouter = express.Router();

cityRouter.route('/').get(cityController.getCities).post(cityController.createCity);
cityRouter.route('/:id').get(cityController.getCity).delete(cityController.deleteCity);

module.exports = cityRouter;
