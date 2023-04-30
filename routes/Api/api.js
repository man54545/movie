const express = require('express');
const routes = express.Router();
const indexController = require('../../controller/ApiController/apiController');


routes.get('/view_movie', indexController.viewMovie);

module.exports = routes;