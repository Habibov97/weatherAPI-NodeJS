const weatherService = require('../services/weather.service');

exports.getCitiesWeatherList = async (req, res) => {
  let result = await weatherService.getWeatherList();
  res.status(200).json({ status: 'success', citiesWeather: result });
};

exports.getCityWeather = async (req, res) => {
  const { id } = req.params;
  if (!id || id.trim() < 3) return res.status(404).json({ message: 'given id is invalid or characters less than 3' });

  const result = await weatherService.getCityWeather(id);
  if (!result)
    return res.status(404).json({ message: 'weather details cannot find for given city or city does not created yet' });

  res.status(200).json({ status: 'success', result });
};
