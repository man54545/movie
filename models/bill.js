const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');

const movieSchema =  mongoose.Schema({
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true
    },
    plan_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "movie_plan",
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    noSeat : {
        type : Number,
        required : true
    },
    paySeat : {
        type : String,
        required : true
    },
    screen : {
        type : Number,
        required : true
    },    
    row : {
        type : String,
        required : true
    },
    serial : {
        type : String,
        required : true
    },
    status : {
        type : Boolean,
        required : true,
        default : true
    },
});

const movie = mongoose.model('bill', movieSchema);

module.exports = movie;