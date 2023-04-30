var bill = require('../../models/bill');
var detail = require('../../models/movie_details');

module.exports.viewBills = async (req,res) => {
    var details = await detail.find({status : true});
    var data = await bill.find({status : true}).populate('user_id').populate('plan_id').exec();
    return res.render('AdminPanel/view_bill', {
        bill : data,
        detail : details
    });
}
