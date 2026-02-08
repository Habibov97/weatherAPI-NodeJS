const express = require('express');
const cityWeatherRouter = require('./weather.route');
const cityRouter = require('./city.router');
const router = express.Router();

router.use('/city-weather', cityWeatherRouter);
router.use('/city', cityRouter);

module.exports = router;
