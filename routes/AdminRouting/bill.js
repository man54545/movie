const express = require('express');
const routes = express.Router();
const indexController = require('../../controller/AdminController/BillController');


routes.get('/view_bill', indexController.viewBills);

module.exports = routes;