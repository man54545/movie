const express = require('express');
const routes = express.Router();
const indexController = require('../../controller/AdminController/MovieMallController');


routes.get('/add_movie_mall', indexController.addMovieMalls);
routes.get('/view_movie_mall', indexController.viewMovieMalls);
routes.post('/add_movie_malls', indexController.addMovieMall);
routes.get('/deleteData/:id', indexController.deleteData);
routes.get('/updateData/:id', indexController.updateData);
routes.post('/editData', indexController.editData);

module.exports = routes;