const config = require('./config/index');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'HELLLOOOOO' });
});

app.listen(config.port, () => {
  console.log(`Listening to http://localhost:${config.port}`);
});
