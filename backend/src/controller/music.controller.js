const musicModel = require("../models/music.model");
const albumModel = require("../models/album.model");

const uploadFile = require("../services/storage.service");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");


async function createMusic(req, res) {


    try {
        // Get token from cookie
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized user"
            });
        }

        

        // Get title from request body
        const { title} = req.body;

        // Get music file
        const file = req.file;

        if (!file) {
            return res.status(400).json({
                message: "Music file is required"
            });
        }

        // Upload file to ImageKit
        const result = await uploadFile(
            file.buffer.toString("base64")
        );

        // Save music in MongoDB
        const music = await musicModel.create({ // here creating collection 
            uri: result.url,
            title: title,
            artist: req.user.id
        });

        // Send response
        return res.status(201).json({
            message: "Music created successfully",
            music: {
                id: music._id,
                url: music.uri,
                title: music.title,
                artist: music.artist
            }
        });

    } catch (error) {
        console.error(error);

        return res.status(401).json({
            message: "Unauthorized"
        });
    }
}

async function createAlbum(req, res) {

    try {

         // Get album data
        const { title, songs } = req.body;
       // NOW use them
        console.log("TITLE:", title);
        console.log("SONGS:", songs);



        // Get token from cookie
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized user"
            });
        }

        
       


        // Create album
        const album = await albumModel.create({
            title: title,
            artist: req.user.id,
            songs
        });

    


        // Response
        return res.status(201).json({
            message: "Album created successfully",

            album: {
                id: album._id,
                title: album.title,
                artist: album.artist,
                songs: album.songs
            }

        });


    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}



module.exports = {
    createMusic ,createAlbum
};

