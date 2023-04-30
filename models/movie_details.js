const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = ('/assets/uploads');

const movieSchema =  mongoose.Schema({
    movie_name : {
        type : String,
        required : true
    },
    movie_quality : {
        type : Array,
        required : true
    },
    movie_runtime : {
        type : Number,
        required : true
    },
    movie_rated : {
        type : String,
        required : true
    },
    movie_year : {
        type : Number,
        required : true
    },
    movie_genres : {
        type : Array,
        required : true
    },
    movie_language : {
        type : Array,
        required : true
    },
    movie_description : {
        type : String,
        required : true
    },
    movie_avatar : {
        type : String,
        required : true
    },
    status : {
        type : Boolean,
        required : true,
        default : true
    },
});


const storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, path.join(__dirname,"..",AVATAR_PATH));
    },  
    filename : function(req ,file, cb){
        cb(null, file.fieldname+"-"+Date.now());
    }
});

movieSchema.statics.uploadedAvatar = multer({storage : storage}).single('movie_avatar');
movieSchema.statics.avatarPath = AVATAR_PATH;

const movie = mongoose.model('movie_detail', movieSchema);

module.exports = movie;