require('dotenv').config();
require('./database/client');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const duckiesRouter = require('./routes/duckies');
const conversationsRouter = require('./routes/conversations');
const tagsRouter = require('./routes/tags');
const authenticationRouter = require('./routes/authentication');

const app = express();

app.use(cors({
  exposedHeaders: 'x-authorization-token',
}))

app.use(express.static(path.join(__dirname, 'public')));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/duckies', duckiesRouter);
app.use('/tags', tagsRouter);
app.use('/conversations', conversationsRouter);
app.use('/auth', authenticationRouter);

module.exports = app;