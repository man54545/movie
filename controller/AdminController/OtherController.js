const other = require('../../models/movie_other');
const details = require('../../models/movie_details');


module.exports.addMovieOther = async (req,res) => {
    const data = await details.find({status : true});
    return res.render('AdminPanel/insert_movie_other', {
        detail : data
    });
}

module.exports.viewMovieOther = async (req,res) => {
    var page = 1;
    var per_page = 5;
    var search = '';
    if(req.query.page){
        page = JSON.parse(req.query.page);
    }
    if(req.query.search){
        search = req.query.search;
    }
    var data = await other.find({status : true, 
        $or : [
            {movie_streaming_chanel : {$regex : '.*'+search+'.*'}}
        ]
    }).populate('movie_id').skip((page - 1) * per_page).limit(per_page).exec();
    var totals = await other.find({status : true, 
        $or : [
            {
                movie_streaming_chanel : {$regex : '.*'+search+'.*'}}
        ]
    }).countDocuments();
    return res.render('AdminPanel/view_movie_other', {
        other : data,
        count : totals,
        next : page+1,
        prev : page-1,
        curr : page,
        per_page : per_page,
        search : search,
        total : Math.ceil(totals/per_page)
    });
}

module.exports.addOthers = async (req,res) => {
    const data = await other.create(req.body);
    if(data){
        return res.redirect('back');
    }
    else{
        return res.redirect('back');
    }
}

module.exports.deleteData = async (req,res) => {
    const data = await other.findByIdAndDelete(req.params.id);
    if(data){
        return res.redirect('back');
    }
    else{
        return res.redirect('back');
    }
}

module.exports.updateData = async (req,res) => {
    const ddata = await details.find({status : true});
    const data = await other.findById(req.params.id).populate('movie_id').exec();
    return res.render('AdminPanel/update_movie_other', {
        other : data,
        detail : ddata
    });
}

module.exports.editData = async (req,res) => {
    var data = await other.findByIdAndUpdate(req.body.editId, req.body);
    if(data){
        return res.redirect('view_movie_other');
    }
    else{
        return res.redirect('back');
    }
}