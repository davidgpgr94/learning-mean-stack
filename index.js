'use strict'

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/curso_mean_spotify', (err, res) => {
    if(err) {
        throw err;
    } else {
        console.log("DB is running OK...");
    }
});