const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true});
const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

const playerRouter = require('./routes/players');
const countryRouter = require('./routes/country');
const groupRouter = require('./routes/group');
const competitionRouter = require('./routes/competition');
const eventRouter = require('./routes/event');
const scoreRouter = require('./routes/score');

app.use('/players', playerRouter);
app.use('/countries', countryRouter);
app.use('/groups', groupRouter);
app.use('/comps', competitionRouter);
app.use('/events', eventRouter);
app.use('/scores', scoreRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
});