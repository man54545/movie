const express = require('express');
const routes = express.Router();
const indexController = require('../../controller/AdminController/AdminController');
const passport = require('passport');

routes.get('/admin_login', indexController.AdminLogin);
routes.get('/admin_register' ,indexController.AdminRegister);
routes.post('/Dashboard', passport.authenticate('admin',{failureRedirect :'/admin_login'}), indexController.Dashboard);
routes.post('/registerProcess', indexController.registerProcess);
routes.get('/changePass', indexController.changePass);
routes.post('/editPassword', indexController.editPassword);
routes.post('/checkEmail', indexController.checkEmail);
routes.get('/checkOpt', indexController.checkOpt);
routes.post('/checkOTP', indexController.checkOTP);
routes.get('/setPass', indexController.setPass);
routes.get('/LostPass', indexController.LostPass);
routes.post('/Checkpass', indexController.Checkpass);
routes.get('/logOut', function(req, res, next){
    req.logout(function(err){
        if(err){
            return next(err);
        }
    });
    return res.redirect('admin_login');
});
routes.get('/LostPass', function(req,res){
    return res.render('Lostpass');
});

module.exports = routes;