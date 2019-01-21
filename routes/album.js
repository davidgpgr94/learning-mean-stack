'use strict'

var express = require('express');
var AlbumController = require('../controllers/album');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/artists'});

api.get('/album', md_auth.ensureAuth, AlbumController.getAlbum);

module.exports = api;