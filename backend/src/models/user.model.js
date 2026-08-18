const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: string,
        required: true,
        unique: true
    },
    
    email: {
        type: string,
        required: true,
        unique: true,
    },

    password: {
        type: string,
        required: true,
    },

    role:{
        type: string,
        enum: ['user', 'artist'],
        default: 'user'
    }
})

const userModel = mongoose.model("user", userSchema)

module.exports = userModel;