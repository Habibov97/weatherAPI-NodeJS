const config = require('./config/index');
const dbConnect = require('./config/database');
require('./workers/index');
const express = require('express');
const cors = require('cors');
const router = require('./routes/index');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'HELLLOOOO' });
});

app.use('/api', router);

dbConnect().then((result) => {
  if (!result) return process.exit(1);
  app.listen(config.port, () => {
    console.log(`Listening to http://localhost:${config.port}`);
  });
});
