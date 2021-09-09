const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    occupation: {
        type: String, 
        enum: {
            values: ["employed",
                "student",
                "business"
            ]
        }
    },
    status: {
        type: String,
        enum: {
            values: ["Male", "Female"]
        }
    },
    bio: { type: String },
    acceptTerms:{type:String}

})


const postMessage = mongoose.model('postMessage',postSchema);

module.exports = postMessage;

