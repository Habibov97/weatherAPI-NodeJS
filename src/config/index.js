const path = require('path');
const dotenv = require('dotenv');

const envPath = path.join(__dirname, '../../.env.local');
dotenv.config({ path: envPath });

module.exports = {
  port: process.env.PORT,
  databaseURL: process.env.DATABASE_URL,
  weatherAPI: {
    url: process.env.WEATHER_API_URL,
    apikey: process.env.WEATHER_API_KEY,
  },
};
