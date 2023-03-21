var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var ordersRouter = require('./routes/orders');
var productsRouter = require('./routes/products');

const mongoose = require('mongoose');

var app = express();

async function init () {
    try {
        const options = {useNewUrlParser: true, useUnifiedTopology: true};
        await mongoose.connect('mongodb://127.0.0.1:27017/jenny-svensson', options);
        console.log("connected to database!");
    } catch (error) {
        console.error(error)
    }
}

init();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/products', productsRouter);

module.exports = app;
