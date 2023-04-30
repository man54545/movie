const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/Movie');

const movie = mongoose.connection;

movie.once('open', function(err){
    if(err)
    {
        console.log("Db is not connected.");
        return false;
    }
    console.log("Db is connected.");
});

module.exports = movie;