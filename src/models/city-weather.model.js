const mongoose = require('mongoose');

const cityWeatherSchema = new mongoose.Schema(
  {
    city: {
      type: String,
      required: true,
      unique: true,
    },
    temperature: {
      type: Number,
    },
    date: {
      type: Date,
      required: true,
      get: function (val) {
        if (!val) return val;
        return val.toLocaleDateString('az-AZ', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });
      },
    },
  },
  { timestamps: true, toJSON: { virtuals: true, getters: true }, toObject: { virtuals: true, getters: true } },
);

cityWeatherSchema.virtual('createdAtFormatted').get(function () {
  if (!this.createdAt) return null;

  return new Intl.DateTimeFormat('az-AZ', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(this.createdAt);
});

cityWeatherSchema.virtual('updatedAtFormatted').get(function () {
  if (!this.updatedAt) return null;
  return new Intl.DateTimeFormat('az-AZ', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(this.updatedAt);
});

const cityWeatherModel = new mongoose.model('CityWeather', cityWeatherSchema);

module.exports = cityWeatherModel;
