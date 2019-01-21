'use strict'

var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var jwt = require('../services/jwt');


function pruebas(req, res) {
    res.status(200).send({
        message: 'Probando una accion del controlador de usuarios de la api rest con node+mongo'
    });
};

function saveUser(req, res) {
    var user = new User();

    var params = req.body;

    console.log(params);

    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.role = 'ROLE_ADMIN';
    user.image = 'null';

    if(params.password) {
        //Encriptamos la contraseña y guardamos los datos
        bcrypt.hash(params.password, null, null, (err, hash) => {
            user.password = hash;
            if(user.name != null && user.surname != null && user.email != null) {
                // guardar el user
                user.save((err, userStored) => {
                    if(err) {
                        res.status(500).send({message: 'Error al guardar el usuario'});
                    } else {
                        if(!userStored) {
                            res.status(404).send({message: 'No se ha registrado el usuario'});
                        } else {
                            res.status(200).send({user: userStored});
                        }
                    }
                });
            } else {
                res.status(200).send({message: 'Rellena todos los campos'});        
            }
        });
    } else {
        res.status(200).send({message: 'Introduce la contraseña'});
    }

};

function loginUser(req, res) {
    var params = req.body;

    var email = params.email;
    var password = params.password;

    User.findOne({email: email.toLowerCase()}, (err, user) => {
        if(err) {
            res.status(500).send({message: 'Error en la petición'});
        } else {
            if (!user) {
                res.status(404).send({message: 'El usuario no existe'});
            } else {
                // comprobamos la contraseña
                bcrypt.compare(password, user.password, (err, check) => {
                    if(check) {
                        // devolvemos los datos del usuario logeado
                        if(params.gethash) {
                            // devolvemos un token de jwt
                            res.status(200).send({
                                token: jwt.createToken(user)
                            });
                        } else {
                            res.status(200).send({user});
                        }
                    } else {
                        res.status(404).send({message: 'Usuario o contraseña incorrectos'});
                    }
                });
            }
        }
    });
}

module.exports = {
    pruebas,
    saveUser,
    loginUser
};