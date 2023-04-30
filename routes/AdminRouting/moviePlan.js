const express = require('express');
const routes = express.Router();
const indexController = require('../../controller/AdminController/PlanController');


routes.get('/add_movie_plan', indexController.addMoviePlans);
routes.get('/view_movie_plan', indexController.viewMoviePlans);
routes.post('/add_plan', indexController.addPlans);
routes.get('/deleteData/:id', indexController.deleteData);
routes.get('/updateData/:id', indexController.updateData);
routes.post('/editData', indexController.editData);
routes.post('/get_mall', indexController.getMall);

module.exports = routes;