const detail = require('../../models/movie_details');
const fs = require('fs');
const path = require('path');

module.exports.addMovieDetails = async (req,res) => {
    return res.render('AdminPanel/insert_movie_detail');
}

module.exports.viewMovieDetails = async (req,res) => {
    var page = 1;
    var per_page = 5;
    var search = '';
    if(req.query.page){
        page = JSON.parse(req.query.page);
    }
    if(req.query.search){
        search = req.query.search;
    }
    // const data = await detail.aggregate([
    //     {$match : {status : true}},
    //     {$sort : {movie_name : 1}}
    // ]);
    var data = await detail.find({status : true, 
        $or : [
            {movie_name : {$regex : '.*'+search+'.*'}}
        ]
    }).skip((page - 1) * per_page).limit(per_page).exec();
    var totals = await detail.find({status : true, 
        $or : [
            {movie_name : {$regex : '.*'+search+'.*'}}
        ]
    }).countDocuments();
    return res.render('AdminPanel/view_movie_detail', {
        detail : data,
        count : totals,
        next : page+1,
        prev : page-1,
        curr : page,
        per_page : per_page,
        search : search,
        total : Math.ceil(totals/per_page)
    });
}

module.exports.addDetails = async (req,res) => {
    if(req.file){
        req.body.movie_avatar = detail.avatarPath+"/"+req.file.filename;
    }
    const data = await detail.create(req.body);
    if(data){
        return res.redirect('back');
    }
    else{
        return res.redirect('back');
    }
}

module.exports.deleteData = async (req,res) => {
    const fdata = await detail.findById(req.params.id);
    if(fdata.movie_avatar){
        fs.unlinkSync(path.join(__dirname,"../..",fdata.movie_avatar));
    }
    var data = await detail.findByIdAndDelete(req.params.id);
    if(data){
        return res.redirect('back');
    }
    else{
        return res.redirect('back');
    }
}

module.exports.updateData = async (req,res) => {
    var data = await detail.findById(req.params.id);
    return res.render('AdminPanel/update_movie_detail', {
        detail : data
    });
}

module.exports.editData = async (req,res) => {
    if(req.file){
        var data = await detail.findById(req.body.editId);
        if(data.movie_avatar){
            fs.unlinkSync(path.join(__dirname,"../..",data.movie_avatar)); 
        }
        req.body.movie_avatar = detail.avatarPath+"/"+req.file.filename;
        const odata = await detail.findByIdAndUpdate(req.body.editId, req.body);
        if(data){
            return res.redirect('view_movie_detail');
        }
        else{
            return res.redirect('back');
        }
    }
    else{
        var data = await detail.findByIdAndUpdate(req.body.editId, req.body);
        if(data){
            return res.redirect('view_movie_detail');
        }
        else{
            return res.redirect('back');
        }
    }
}
