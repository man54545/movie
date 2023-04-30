const express = require('express');
const routes = express.Router();
const indexController = require('../../controller/AdminController/OtherController');


routes.get('/add_movie_other', indexController.addMovieOther);
routes.get('/view_movie_other', indexController.viewMovieOther);
routes.post('/add_other',indexController.addOthers);
routes.get('/deleteData/:id', indexController.deleteData);
routes.get('/updateData/:id', indexController.updateData);
routes.post('/editData', indexController.editData);


module.exports = routes;