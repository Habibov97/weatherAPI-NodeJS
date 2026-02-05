const cron = require('cron');
const { fetchCurrentWeather } = require('../services/weather-api.services');
const cityWeatherModel = require('../models/city-weather.model');
const cronjob = cron.CronJob;

const job = new cronjob('* * * * *', async () => {
  const cities = await cityWeatherModel.find({}, 'city');

  for (let item of cities) {
    let result = await fetchCurrentWeather(item.city);
    if (!result) continue;
    await cityWeatherModel.findOneAndUpdate(
      { city: item.city },
      {
        temperature: result.temp_c,
        date: new Date(),
      },
      { upsert: true, new: true },
    );
  }
  console.log('worker executed');
});

job.start();
