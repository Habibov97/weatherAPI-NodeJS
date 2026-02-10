const cityModel = require('../models/city.model');
const cityWeatherModel = require('../models/weather.model');
const { checkCityName } = require('./weather-api.services');
const weatherService = require('./weather.service');

const getCities = async () => {
  let cities = await cityModel.find();
  return cities;
};

const getCity = async (id) => {
  try {
    let city = await cityModel.findById(id);
    return city;
  } catch (error) {
    return false;
  }
};

const getCityByName = (name) => cityModel.findOne({ name: new RegExp(name, 'i') });

const createCity = async (name) => {
  let isNameValid = await checkCityName(name);
  if (!isNameValid) throw new Error('City name is not found or valid!');

  try {
    let city = await cityModel.create({
      name,
    });
    weatherService.createCityWeather(name);
    return city;
  } catch (error) {
    throw new Error('City already exists!');
  }
};

const deleteCity = async (id) => {
  try {
    const city = await cityModel.findById(id);
    if (!city) return false;
    await cityModel.findByIdAndDelete(id);
    await cityWeatherModel.deleteMany({ city: city.name });

    return true;
  } catch (error) {
    return false;
  }
};

const cityService = {
  getCities,
  getCity,
  getCityByName,
  createCity,
  deleteCity,
};

module.exports = cityService;
