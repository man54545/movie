const express = require('express');
const routes = express.Router();
const indexController = require('../controller/indexController');
const passport = require('passport');


routes.get('/', indexController.Main);
routes.get('/admin_panel',passport.checkAuthentication , indexController.AdminPanel);
routes.get('/genre/:id', indexController.genre);
routes.get('/book_now/:id', passport.checkAuthenticationuser , indexController.bookNow);
routes.get('/bookShow/:id', passport.checkAuthenticationuser ,indexController.bookShow);
routes.post('/finalPayment', passport.checkAuthenticationuser , indexController.finalPayment);
routes.get('/bill', passport.checkAuthenticationuser , indexController.bill);
routes.get('/login_user', indexController.loginUser);
routes.get('/register_user', indexController.registerUser);
routes.post('/loginUser',passport.authenticate('user', {failureRedirect : 'loginUser'}) , indexController.userLogin);
routes.post('/registerUser', indexController.userRegister);
routes.get('/pop_show_all', indexController.popAll);
routes.get('/movie_show_all', indexController.releaseAll);
routes.get('/show_all', indexController.showAll);
routes.get('/contact', indexController.contact);
routes.get('/about', indexController.about);
routes.get('/genres', indexController.genres);
routes.get('/search_genre', indexController.searchGenre);
routes.post('/search', indexController.search);
routes.get('/logOutUser', function(req, res, next){
    req.logout(function(err){
        if(err){
            return next(err);
        }
    });
    req.user = '';
    return res.redirect('/');
});


routes.use('/', require('./AdminRouting/admin'));
routes.use('/movie_details',passport.checkAuthentication, require('./AdminRouting/movieDetails'));
routes.use('/movie_others',passport.checkAuthentication, require('./AdminRouting/movieOthers'));
routes.use('/movie_plan',passport.checkAuthentication, require('./AdminRouting/moviePlan'));
routes.use('/mall',passport.checkAuthentication, require('./AdminRouting/mall'));
routes.use('/user',passport.checkAuthentication, require('./AdminRouting/user'));
routes.use('/movie_mall',passport.checkAuthentication, require('./AdminRouting/movie_mall'));
routes.use('/bill',passport.checkAuthentication, require('./AdminRouting/bill'));
routes.use('/api', require('./Api/api'));


module.exports = routes;