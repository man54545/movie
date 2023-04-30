const detail = require('../../models/movie_details');
const mall = require('../../models/mall');
const movie_mall = require('../../models/movie_mall');

module.exports.addMovieMalls = async (req,res) => {
    var data = await detail.find({status : true});
    var data1 = await mall.find({status : true});
    return res.render('AdminPanel/insert_movie_mall', {
        detail : data,
        mall : data1
    });
}

module.exports.viewMovieMalls = async (req,res) => {
    var data = await movie_mall.find({status : true}).populate('movie_id').populate('mall_id').exec();
    return res.render('AdminPanel/view_movie_mall', {
        movie_mall : data
    });
}

module.exports.addMovieMall = async (req,res) => {
    const data = await movie_mall.create(req.body);
    if(data){
        return res.redirect('back');
    }
    else{
        return res.redirect('back');
    }
}

module.exports.deleteData = async (req,res) => {
    const data = await movie_mall.findByIdAndDelete(req.params.id);
    if(data){
        return res.redirect('back');
    }
    else{
        return res.redirect('back');
    }
}

module.exports.updateData = async (req,res) => {
    const data = await movie_mall.findById(req.params.id);
    var data1 = await detail.find({status : true});
    var data2 = await mall.find({status : true});
    return res.render('AdminPanel/update_movie_mall', {
        movie_mall : data,
        detail : data1,
        mall : data2
    });
}

module.exports.editData = async (req,res) => {
        var data = await movie_mall.findByIdAndUpdate(req.body.editId, req.body);
        if(data){
            return res.redirect('view_movie_mall');
        }
        else{
            return res.redirect('back');
        }
}