'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// cargar rutas api
var user_routes = require('./routes/user');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json()); // para transformar en objetos json las peticiones http que nos llegue

// configurar cabeceras http

// rutas base
app.use('/api', user_routes);

module.exports = app;