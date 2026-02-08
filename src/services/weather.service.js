const { format } = require('date-fns');
const { fetchWeather } = require('./weather-api.services');
const cityWeatherModel = require('../models/weather.model');
const config = require('../config');
const cityModel = require('../models/city.model');

const getWeatherList = async () => {
  let date = format(new Date(), 'yyyy-MM-dd');
  let list = await cityWeatherModel.find();
  return list;
};

const getCityWeather = async (id) => {
  let result = await cityModel.findById(id);
  if (!result) return false;
  let weatherResult = await cityWeatherModel.find({ city: result.name });
  if (!weatherResult) return false;

  return weatherResult;
};

const createCityWeather = async (cityName) => {
  let result = await fetchWeather(cityName, config.forecastDays); //was item.city with models
  if (!result) return;
  for (let dayResult of result) {
    await cityWeatherModel.findOneAndUpdate(
      { city: cityName, date: dayResult.date },
      {
        temperature: dayResult.day.avgtemp_c,
        date: dayResult.date,
      },
      { upsert: true, new: true },
    );
  }
};

const weatherService = {
  createCityWeather,
  getWeatherList,
  getCityWeather,
};

module.exports = weatherService;
