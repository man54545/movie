const mongoose = require('mongoose');

const movieSchema =  mongoose.Schema({
    movie_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "movie_detail",
        required : true
    },
    mall_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "mall",
        required : true
    },
    show_time : {
        type : String,
        required : true
    },
    show_price : {
        type : Number,
        required : true
    },
    status : {
        type : Boolean,
        required : true,
        default : true
    },
});

const movie = mongoose.model('movie_plan', movieSchema);

module.exports = movie;