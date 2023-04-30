const mongoose = require('mongoose');

const movieSchema =  mongoose.Schema({
    movie_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "movie_detail",
        required : true
    },  
    movie_streaming_chanel : {
        type : String,
        required : true
    },
    movie_view_count : {
        type : Number,
        required : true
    },
    movie_link : {
        type : String,
        required : true
    },
    movie_trailer_link : {
        type : String,
        required : true
    },
    status : {
        type : Boolean,
        required : true,
        default : true
    },
});


const movie = mongoose.model('movie_other', movieSchema);

module.exports = movie;