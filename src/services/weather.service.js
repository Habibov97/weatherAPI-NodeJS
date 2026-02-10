const { format, differenceInDays } = require('date-fns');
const { fetchWeather } = require('./weather-api.services');
const cityWeatherModel = require('../models/weather.model');
const config = require('../config');

const getWeatherList = async (query = {}, { ignoredDate = false } = {}) => {
  let { date, city } = query;
  if (!date && !ignoredDate) date = format(new Date(), 'yyyy-MM-dd');

  let where = {};
  if (date) {
    where.date = date;
  }

  if (city)
    where.city = {
      $regex: new RegExp(city, 'i'),
    };
  let list = await cityWeatherModel.find(where);
  return list;
};

const getCityWeatherByCityName = async (city) => {
  const caseSensetiveCityName = {
    $regex: new RegExp(city, 'i'),
  };
  let weatherResultByCityName = await cityWeatherModel.find({ city: caseSensetiveCityName });

  return weatherResultByCityName;
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

const deleteOutdatedWeather = async (city) => {
  let citiesWeather = await getWeatherList({ city }, { ignoredDate: true });
  for (let cityWeather of citiesWeather) {
    const cityDate = new Date(cityWeather.date);
    if (differenceInDays(new Date(), cityDate) > 0) {
      await cityWeatherModel.deleteOne({ _id: cityWeather._id });
    }
  }
};

const weatherService = {
  createCityWeather,
  getWeatherList,
  getCityWeatherByCityName,
  deleteOutdatedWeather,
};

module.exports = weatherService;
