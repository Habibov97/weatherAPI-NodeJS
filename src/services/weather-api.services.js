const axios = require('axios');
const { weatherAPI } = require('../config');

const api = axios.create({
  baseURL: weatherAPI.url,
});

api.interceptors.request.use(
  function (config) {
    let url = config.url;

    if (url.includes('?')) {
      url += `&key=${weatherAPI.apikey}`;
    } else {
      url += `?key=${weatherAPI.apikey}`;
    }

    config.url = url;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

// More beautiful way
// api.interceptors.request.use((config) => {
//   config.params = {
//     ...(config.params || {}),
//     key: weatherAPI.apikey,
//   };
//   return config;
// });

const fetchCurrentWeather = async (cityName) => {
  try {
    let result = await api.get(`current.json?q=${cityName}`);
    // More beautiful way
    // api.get('current.json', {
    //   params: { q: cityName },
    // });
    return result.data.current;
  } catch (err) {
    console.error('request failed with error', err);
    return false;
  }
};

const fetchWeather = async (cityName, day = 1) => {
  try {
    let result = await api.get(`forecast.json?q=${cityName}&days=${day}`);
    return result.data.forecast.forecastday;
  } catch (error) {
    console.error('request failed with error', err);
    return false;
  }
};

module.exports = {
  fetchCurrentWeather,
};
