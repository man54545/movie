const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');

const movieSchema =  mongoose.Schema({
    username :{
        type : String,
        required : true
    },
    email : {
        type  :String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    status : {
        type : Boolean,
        required : true,
        default : true
    },
    role : {
        type : String,
        required : true
    }
});

const movie = mongoose.model('user', movieSchema);

module.exports = movie;