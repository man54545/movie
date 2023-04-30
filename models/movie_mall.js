const mongoose = require('mongoose');

const movieSchema =  mongoose.Schema({
    movie_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "movie_detail",
        required : true
    },  
    mall_id : {
        type : mongoose.Schema.Types.Array,
        ref : "mall",
        required : true
    },
    status : {
        type : Boolean,
        required : true,
        default : true
    },
});

const movie = mongoose.model('movie_mall', movieSchema);

module.exports = movie;