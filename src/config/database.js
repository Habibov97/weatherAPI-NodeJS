const mongoose = require('mongoose');
const config = require('./index');

const connect = () => {
  return mongoose
    .connect(config.databaseURL)
    .then(() => {
      console.log('Database connected successfully!');
      return true;
    })
    .catch((error) => {
      console.log('Error occured', error);
      return false;
    });
};

module.exports = connect;
