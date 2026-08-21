const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const musicSchemas = new Schema({
    uri: {
          type: String, 
        required: true
    },

    title: {
         type: String, 
        required: true,
        max: 100,
        min: 8
    },

    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    }
    
})

const musicModel = mongoose.model("music", musicSchemas );
module.export = musicModel;
