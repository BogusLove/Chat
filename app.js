const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const message = require('./routes/message');
const users = require('./routes/users');
const { connection, options } = require('./db_config.json');

const app = express();

mongoose.connect(connection, options);
mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/messages', message);
app.use('/users', users);

module.exports = app;
