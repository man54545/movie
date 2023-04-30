const express = require('express');
const routes = express.Router();
const indexController = require('../../controller/AdminController/UserController');



routes.get('/view_user', indexController.viewUsers);
routes.get('/deleteData/:id', indexController.deleteData);


module.exports = routes;