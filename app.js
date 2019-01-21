'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// cargar rutas api

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json()); // para transformar en objetos json las peticiones http que nos llegue

// configurar cabeceras http

// rutas base

app.get('/pruebas', (req, res) => {
    res.status(200).send({message: 'Hello World!'});
});

module.exports = app;