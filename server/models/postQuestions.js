const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    questionText:{type:String},
    questiontype:[{optionText:String}],
    options:{type:String},
    open:{type:String},
    required:{type:String}
})

const postQuestions = mongoose.model('postQuestions',postSchema);

module.exports = postQuestions;
