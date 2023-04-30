const detail = require('../models/movie_details');
const other = require('../models/movie_other');
const plan = require('../models/movie_plan');
const movie_mall = require('../models/movie_mall');
const user = require('../models/users');
const bill = require('../models/bill');


module.exports.Main = async (req,res) => {
    const user = req.user;
    const data  = await detail.find({status : true});
    const show  = await detail.find({status : true}).limit(4);
    const pop = await other.find({status : true,movie_view_count : {$gt : 9}}).sort({$natural:-1}).limit(4).populate('movie_id').exec();
    return res.render('main', { 
        detail : data,
        pop : pop,
        show : show,
        user : user
    });
}

module.exports.userLogin = async (req,res)=>{
    const user = req.user;
    const data  = await detail.find({status : true});
    const show  = await detail.find({status : true}).limit(4);
    const pop = await other.find({status : true,movie_view_count : {$gt : 9}}).sort({$natural:-1}).limit(4).populate('movie_id').exec();
    return res.render('main', { 
        detail : data,
        pop : pop,
        show : show,
        user : user
    });
}

module.exports.AdminPanel = async (req,res) => {
    return res.render('AdminPanel/dashboard');
}

module.exports.genre = async (req,res) => {
    const user = req.user;
    var data = await detail.findById(req.params.id);
    var others = await other.findOne({movie_id : req.params.id});
    return res.render('genre', {
        detail : data,
        other : others,
        user : user
    });
}

module.exports.bookNow = async (req,res) => {
    if(!req.isAuthenticated()){
        return res.redirect('/login_user');
    }
    const user = req.user;
    var data = await detail.findById(req.params.id);
    var data1 = await other.findOne({movie_id : req.params.id}).populate('movie_id').exec();
    var dataa = await plan.find({movie_id : req.params.id}).populate('movie_id').populate('mall_id').exec();
    var movie_malls = await movie_mall.findOne({movie_id : req.params.id}).populate('movie_id').populate('mall_id').exec();
    return res.render('book_tickets', {
        detail : data,
        other : data1,
        plan : dataa,
        movie_mall : movie_malls,
        user : user
    }); 
}

module.exports.popAll = async (req,res) =>{
    const pop = await other.find({status : true,movie_view_count : {$gt : 10}}).sort({$natural:-1}).populate('movie_id').exec();
    return res.render('pop_show_all', {
        pop : pop
    });
}

module.exports. releaseAll = async (req,res) =>{
    const data = await detail.find({status : true}).sort({$natural:-1});
    return res.render('movie_show_all', {
        data : data
    });
}

module.exports. showAll = async (req,res) =>{
    const data = await detail.find({status : true}).sort({$natural:-1});
    return res.render('show_all', {
        data : data
    });
}

module.exports.contact = async (req,res) =>{
    return res.render('contact');
}

module.exports.about = async (req,res) =>{
    return res.render('about');
}

module.exports.genres = async (req,res) =>{
    return res.render('genres');
}

module.exports.bookShow = async (req,res) => {
    const user = req.user;
    var data = await plan.findById(req.params.id).populate('movie_id').exec();
    return res.render('book_show', {
        show : data,
        data : req.cookies.bill,
        user : user
    });
}

module.exports.finalPayment = async (req,res) => {
    var serial = Math.ceil(Math.random() * Math.pow(10,20)).toString();
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    req.body.screen = Math.ceil(Math.random() * 10);
    req.body.row = alphabet[Math.floor(Math.random() * alphabet.length)];
    req.body.serial = serial;
    req.body.user_id = req.user.id;
    var data = await bill.create(req.body);
    if(data){
        res.cookie('bill',data);
        return res.redirect('back');
    }
    else{
        return res.redirect('back');
    }
}

module.exports.bill = async (req,res) => {
    const user = req.user;
    var date_ob = new Date();
    var day = ("0" + date_ob.getDate()).slice(-2);
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    var year = date_ob.getFullYear();
    var date = day + "-" + month + "-" + year;
    var plans =  await plan.findById(req.cookies.bill.plan_id).populate('movie_id').populate('mall_id').exec();
    var details =  await detail.findById(plans.movie_id.id);
    var others =  await other.findOne({movie_id : plans.movie_id.id});
    var data = req.cookies.bill;

    return res.render('final_pay', {
        date : date,
        data : data,
        detail : details,
        plan : plans,
        other : others,
        user : user
    });
}

module.exports.loginUser = async (req,res)=>{
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('login');
}

module.exports.registerUser = async (req,res)=>{
    return res.render('register');
}

module.exports.userRegister = async (req,res)=>{
    if(req.body.password == req.body.cpassword){
        req.body.role = "user";
        const data = await user.create(req.body);
        if(data){
            return res.redirect('login_user');
        }
        else{
            return res.redirect('back');
        }
    }
}

module.exports.search = async (req,res)=>{
    const sData = req.body.search;
    var detailData = await detail.find({status : true, 
        $or : [
            {movie_name : {$regex : '.*'+sData+'.*'}}
        ] 
    });
    return res.render('search', {
        detail : detailData,
        search : sData
    });
}

module.exports.searchGenre = async (req,res) => {
    var genres = req.query.genre;
    var detailData = await detail.find({status : true,});
    return res.render('search_genre', {
        genre : genres,
        detail : detailData
    });
}