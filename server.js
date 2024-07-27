const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const songsRouter = require('./routes/songs');
const statsRouter = require('./routes/stats');

const app = express();

mongoose.connect('mongodb://mongo:27017/songsdb', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());

app.use('/songs', songsRouter);
app.use('/stats', statsRouter);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
