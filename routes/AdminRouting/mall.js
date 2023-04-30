const express = require('express');
const routes = express.Router();
const indexController = require('../../controller/AdminController/MallController');


routes.get('/add_mall', indexController.addMall);
routes.get('/view_mall', indexController.viewMalls);
routes.post('/add_malls', indexController.addMalls);
routes.get('/deleteData/:id', indexController.deleteData);
routes.get('/updateData/:id', indexController.updateData);
routes.post('/editData', indexController.editData);

module.exports = routes;