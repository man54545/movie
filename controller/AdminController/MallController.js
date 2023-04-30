const mall = require('../../models/mall');

module.exports.addMall = async (req,res) => {
    return res.render('AdminPanel/insert_mall');
}

module.exports.viewMalls = async (req,res) => {
    var page = 1;
    var per_page = 5;
    var search = '';
    if(req.query.page){
        page = JSON.parse(req.query.page);
    }
    if(req.query.search){
        search = req.query.search;
    }
    var data = await mall.find({status : true, 
        $or : [
            {mall_name : {$regex : '.*'+search+'.*'}}
        ]
    }).skip((page - 1) * per_page).limit(per_page).exec();
    var totals = await mall.find({status : true, 
        $or : [
            {mall_name : {$regex : '.*'+search+'.*'}}
        ]
    }).countDocuments();
    return res.render('AdminPanel/view_mall', {
        mall : data,
        count : totals,
        next : page+1,
        prev : page-1,
        curr : page,
        per_page : per_page,
        search : search,
        total : Math.ceil(totals/per_page)
    });
}

module.exports.addMalls = async (req,res) => {
    const data = await mall.create(req.body);
    if(data){
        return res.redirect('back');
    }
    else{
        return res.redirect('back');
    }
}

module.exports.deleteData = async (req,res) => {
    const data = await mall.findByIdAndDelete(req.params.id);
    if(data){
        return res.redirect('back');
    }
    else{
        return res.redirect('back');
    }
}

module.exports.updateData = async (req,res) => {
    const data = await mall.findById(req.params.id);
    return res.render('AdminPanel/update_mall', {
        mall : data
    });
}

module.exports.editData = async (req,res) => {
        var data = await mall.findByIdAndUpdate(req.body.editId, req.body);
        if(data){
            return res.redirect('view_mall');
        }
        else{
            return res.redirect('back');
        }
}