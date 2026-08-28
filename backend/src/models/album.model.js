const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 100
        },

        artist: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true
        },

        songs: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "music"
            }
        ]
    },
    {
        timestamps: true
    }
);

const albumModel = mongoose.model("album", albumSchema);

module.exports = albumModel;