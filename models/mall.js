const mongoose = require('mongoose');

const movieSchema =  mongoose.Schema({
    mall_name : {
        type : String,
        required : true
    },
    status : {
        type : Boolean,
        required : true,
        default : true
    },
});

const movie = mongoose.model('mall', movieSchema);

module.exports = movie;