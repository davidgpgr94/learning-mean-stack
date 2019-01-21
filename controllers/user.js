'use strict'

function pruebas(req, res) {
    res.status(200).send({
        message: 'Probando una accion del controlador de usuarios de la api rest con node+mongo'
    });
};

module.exports = {
    pruebas
};