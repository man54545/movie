var other = require('../../models/movie_other');

module.exports.viewMovie = async (req,res) =>{
    var data = await other.find({status : true}).populate('movie_id').exec();
    if(data){
        return res.status(200).json(data);
    }
    else{
        return req.status(400).json("blank");
    }
}