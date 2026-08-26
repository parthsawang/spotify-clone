const musicModel = require("../models/music.model");
const uploadFile = require("../services/storage.service");
const jwt = require("jsonwebtoken");


async function createMusic(req, res) {
    try {
        // Get token from cookie
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized user"
            });
        }

        // Verify JWT
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Check user role
        if (decoded.role !== "artist") {
            return res.status(403).json({
                message: "You don't have access to create music"
            });
        }

        // Get title from request body
        const { title } = req.body;

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
        const music = await musicModel.create({
            url: result.url,
            title: title,
            artist: decoded.id
        });

        // Send response
        return res.status(201).json({
            message: "Music created successfully",
            music: {
                id: music._id,
                url: music.url,
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

module.exports = {
    createMusic
};