var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var Firebase = require("firebase");

module.exports = function(app) {

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  app.use(cookieParser());
  app.use('/', require('./router'));
  app.use(express.static(__dirname + '/../client/app'));

};