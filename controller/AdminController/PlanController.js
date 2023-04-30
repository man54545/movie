const mall = require('../../models/mall');
const details = require('../../models/movie_details');
const plan = require('../../models/movie_plan');
const movie_mall = require('../../models/movie_mall');

module.exports.addMoviePlans = async (req,res) => {
    const data = await details.find({status : true});
    const ddata = await mall.find({status : true});
    const dddata = await movie_mall.find({status : true}).populate('movie_id').exec();
    return res.render('AdminPanel/insert_movie_plan', {
        detail : data,
        mall : ddata,
        movie_mall : dddata
    });
}

module.exports.viewMoviePlans = async (req,res) => {
    var page = 1;
    var per_page = 5;
    var search = '';
    if(req.query.page){
        page = JSON.parse(req.query.page);
    }
    if(req.query.search){
        search = req.query.search;
    }
    var data = await plan.find({status : true, 
        $or : [
            {show_time : {$regex : '.*'+search+'.*'}}
        ]
    }).populate('movie_id').populate('mall_id').skip((page - 1) * per_page).limit(per_page).exec();
    var totals = await plan.find({status : true, 
        $or : [
            {show_time : {$regex : '.*'+search+'.*'}}
        ]
    }).countDocuments();
    return res.render('AdminPanel/view_movie_plan', {
        plan : data,
        count : totals,
        next : page+1,
        prev : page-1,
        curr : page,
        per_page : per_page,
        search : search,
        total : Math.ceil(totals/per_page)
    });
}

module.exports.addPlans = async (req,res) => {
    const data = await plan.create(req.body);
    if(data){
        return res.redirect('back');
    }
    else{
        return res.redirect('back');
    }
}

module.exports.deleteData = async (req,res) => {
    const data = await plan.findByIdAndDelete(req.params.id);
    if(data){
        return res.redirect('back');
    }
    else{
        return res.redirect('back');
    }
}

module.exports.updateData = async (req,res) => {
    const ddata = await details.find({status : true});
    const data = await plan.findById(req.params.id).populate('movie_id').exec();
    return res.render('AdminPanel/update_movie_plan', {
        plan : data,
        detail : ddata
    });
}

module.exports.editData = async (req,res) => {
        var data = await plan.findByIdAndUpdate(req.body.editId, req.body);
        if(data){
            return res.redirect('view_movie_plan');
        }
        else{
            return res.redirect('back');
        }
}

module.exports.getMall = async (req,res) =>{
    var data = await movie_mall.findOne({movie_id : req.body.Id}).populate('mall_id').exec();
    return res.render('AdminPanel/get_mall', {
        data : data
    });

}