const { CronJob } = require('cron');
const cityService = require('../services/city.service');
const weatherService = require('../services/weather.service');

const weatherWorkerHandler = async () => {
  // const cities = await cityWeatherModel.find({}, 'city');
  const cities = await cityService.getCities();
  for (let city of cities) {
    await weatherService.deleteOutdatedWeather(city.name);
    await weatherService.createCityWeather(city.name);
  }
  console.log('worker executed');
};

// const weatherWorkerHandler = async () => {
//   for (let city of cities) {
//     let result = await fetchWeather(city, config.forecastDays);
//     if (!result) continue;
//     for (let dayResult of result) {
//       let date = dayResult.date;
//       let currentData = await cityWeatherModel.findOne({
//         date,
//         city,
//       });
//       if (currentData) {
//         currentData.temperature = dayResult.day.avgtemp_c;
//         await currentData.save();

//         console.log(`${city} for ${date} is updated `);
//       } else {
//         let cityWeather = await cityWeatherModel.create({
//           city,
//           temperature: dayResult.day.avgtemp_c,
//           date,
//         });

//         await cityWeather.save();
//       }
//     }
//   }
//   console.log('worker executed');
// };

weatherWorkerHandler();

const job = new CronJob('0 0 * * *', weatherWorkerHandler);
job.start();
