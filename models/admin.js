const mongoose = require('mongoose');

const movieSchema =  mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
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

const movie = mongoose.model('admin', movieSchema);

module.exports = movie;