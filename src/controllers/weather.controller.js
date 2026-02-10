const cityService = require('../services/city.service');
const weatherService = require('../services/weather.service');

exports.getCitiesWeatherList = async (req, res) => {
  let result = await weatherService.getWeatherList(req.query);

  res.status(200).json({ status: 'success', citiesWeather: result });
};

exports.getCityWeatherList = async (req, res) => {
  let city = await cityService.getCityByName(req.params.city);
  if (!city) return res.status(404).json({ error: 'city not found' });
  return res.json(await weatherService.getWeatherList({ city: city.name }, { ignoredDate: true }));
};

// module.exports = {
//   getCitiesWeatherList,
//   getCityWeatherByCityName,
// };
