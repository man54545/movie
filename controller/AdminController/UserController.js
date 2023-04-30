var user = require('../../models/users');

module.exports.viewUsers = async (req,res) => { 
    var data = await user.find({status : true})
    return res.render('AdminPanel/view_user', {
        user : data
    });
}

module.exports.deleteData = async (req,res) => {
    const data = await user.findByIdAndDelete(req.params.id);
    if(data){
        return res.redirect('back');
    }
    else{
        return res.redirect('back');
    }
}
