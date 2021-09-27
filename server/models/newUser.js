const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userName:{type:String},
    userEmail:[{optionText:String}],
    userPassword:{type:String},
   
})

const newUser = mongoose.model('newUser',postSchema);

module.exports = newUser;
