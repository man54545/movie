const express = require('express');
const routes = express.Router();
const indexController = require('../../controller/AdminController/DetailsController');
const detail = require('../../models/movie_details');


routes.get('/add_movie_detail', indexController.addMovieDetails);
routes.get('/view_movie_detail', indexController.viewMovieDetails);
routes.post('/add_detail',detail.uploadedAvatar, indexController.addDetails);
routes.get('/deleteData/:id', indexController.deleteData);
routes.get('/updateData/:id', indexController.updateData);
routes.post('/editData',detail.uploadedAvatar, indexController.editData);

module.exports = routes;