'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3977;


mongoose.connect('mongodb://localhost:27017/curso_mean_spotify', (err, res) => {
    if(err) {
        throw err;
    } else {
        console.log("DB is running OK...");

        app.listen(port, function() {
            console.log("API Rest server is listening in http://localhost:"+port);
        });
    }
});