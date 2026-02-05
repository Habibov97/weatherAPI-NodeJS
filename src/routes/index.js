const express = require('express');
const cityWeatherRouter = require('./city-weather.route');
const router = express.Router();

router.use('/', cityWeatherRouter);

module.exports = router;
