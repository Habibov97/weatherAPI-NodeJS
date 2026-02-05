const cityWeatherModel = require('../models/city-weather.model');
const { fetchCurrentWeather } = require('../services/weather-api.services');

exports.getCitiesWeather = async (req, res) => {
  const citiesWeather = await cityWeatherModel.find();
  if (!citiesWeather) return res.status(400).json({ error: 'Weather details for cities does not found!' });

  res.status(200).json({ status: 'success', citiesWeather });
};

exports.getCityWeather = async (req, res) => {
  const { id } = req.params;
  const cityWeather = await cityWeatherModel.findById(id);
  if (!cityWeather) return res.status(400).json({ error: 'Weather details for city does not found!' });
  res.status(200).json({ status: 'success', cityWeather });
};

exports.createCityWeather = async (req, res) => {
  const { city } = req.body;
  if (!city) return res.status(404).json({ error: 'City is required' });

  const weather = await fetchCurrentWeather(city);
  if (!weather) return res.status(404).json({ error: 'City name is invalid' });

  const newCityWeather = await cityWeatherModel.create({
    city,
    temperature: weather.temp_c,
    date: new Date(),
  });

  res.status(201).json({ status: 'success', newCityWeather });
};

exports.deleteCityWeather = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(404).json({ error: 'Id is required!' });

  const weather = await cityWeatherModel.findByIdAndDelete(id);
  if (!weather) return res.status('404').json({ error: 'Id is invalid' });

  res.json({ message: 'cityWeather has been deleted successfully!' });
};
