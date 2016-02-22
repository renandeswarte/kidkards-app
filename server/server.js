require('dotenv').load();

var express = require('express');
var http = require('http');

var app = express();
var server = http.Server(app);

app.use(express.static(__dirname + '/../client/app'));

server.listen(process.env.PORT);
console.log('Server now running on port: ' + process.env.PORT);
